// PhCalculationEngine_withPhosphateAndPrecipitation.ts
// Full TypeScript implementation including phosphate equilibrium and Ca precipitation checks.
// -----------------------------------------------------------------------------
// Types (self-contained for copy/paste)
// -----------------------------------------------------------------------------
export enum EffectTiming {
  IMMEDIATE = 'IMMEDIATE',
  WITHIN_24H = 'WITHIN_24H',
  NO_RUSH = 'NO_RUSH'
}

export enum FertilizerType {
  AMMONIUM_BASED = 'AMMONIUM_BASED',
  PHOSPHATE_BASED = 'PHOSPHATE_BASED',
  NPK = 'NPK',
  OTHER = 'OTHER'
}

export enum SafetyRating {
  SAFE = 'SAFE',
  CAUTION = 'CAUTION',
  DANGEROUS = 'DANGEROUS'
}

export interface Fertilizer {
  id: string;
  name: string;
  molecularWeight: number; // g / mol
  // immediate acidity (mol H+ available immediately per mol fertilizer)
  immediateHperMol: number;
  // biological acidity via nitrification (mol H+ per mol fertilizer after nitrification)
  biologicalHperMol?: number;
  // phosphate and sulfate content in mol per mol fertilizer (optional, needed for precipitation checks)
  phosphateMolPerMol?: number; // mol PO₄³⁻ equivalent per mol fertilizer (as total P expressed as PO₄³⁻ equivalent)
  sulfateMolPerMol?: number; // mol SO₄²⁻ per mol fertilizer
  // a flag for phosphate-containing materials (higher precipitation risk)
  precipitationRisk?: boolean;
  // price per kg in local currency (user-supplied)
  pricePerKg: number;
  // fertilizer type
  type?: FertilizerType;
  // purity fraction (0-1)
  purity?: number;
  // optional safety rating
  safetyRating?: SafetyRating;
  // optional additional notes
  notes?: string;
}

export interface FertilizerAvailability {
  fertilizer: Fertilizer;
  availableAmountKg: number; // how much the user has available (kg)
  isSelected?: boolean; // whether user chose it for calculation
}

export interface FertilizerRecommendation {
  fertilizer: Fertilizer;
  amountKg: number;
  amountG: number;
  molesUsed: number;
  cost: number;
  effectType: 'immediate' | 'biological';
  timeToEffect: string;
  precipitationRisk: boolean;
  precipitationRisksList?: string[]; // detailed risk strings
  saltLoadIncrease_mS_cm_est: number;
  phContribution_mmolL?: number;
  notes?: string[];
}

export interface CalculationInput {
  volumeL: number;
  pHInit: number;
  pHTarget: number;
  alkalinityMgLAsCaCO3: number;
  temperatureC?: number;
  waterHardnessMgLAsCaCO3?: number; // used to estimate Ca²⁺
  availableFertilizers: FertilizerAvailability[];
  requiredEffectTiming?: EffectTiming;
  // optional currency tag for printing
  currency?: string;
  // translation function for localized strings
  t?: (key: string, params?: Record<string, any>) => string;
}

export interface CalculationResult {
  recommendedFertilizers: FertilizerRecommendation[];
  alternativeRecommendation?: FertilizerRecommendation;
  totalCost: number;
  finalPh: number;
  timeToEffect: string;
  explanation: string;
  warnings: string[];
  jarTestInstructions: string;
  scientificReasoning: string;
}

// -----------------------------------------------------------------------------
// Engine
// -----------------------------------------------------------------------------
export class PhCalculationEngine {
  // Carbonate constants at 25°C
  private readonly Ka1 = 4.47e-7;
  private readonly Ka2 = 4.67e-11;
  private readonly Kw = 1e-14;

  // Phosphate pKas (25°C) --- used by phosphateSystem
  // --- ADDED: phosphate pKa constants (25°C)
  private readonly P_Ka1 = 7.11e-3;   // pKa1 (H₃PO₄ → H₂PO₄⁻) ~ 2.15 => Ka = 10^-2.15 ≈ 7.08e-3
  private readonly P_Ka2 = 6.32e-8;   // pKa2 (H₂PO₄⁻ → HPO₄²⁻) ~ 7.2 => Ka ≈ 6.31e-8
  private readonly P_Ka3 = 4.49e-13;  // pKa3 (HPO₄²⁻ → PO₄³⁻) ~ 12.35 => Ka ≈ 4.47e-13

  // Ksp values for precipitation checks (approximate literature values)
  // --- ADDED: solubility products (Ksp)
  private readonly Ksp_Ca3PO42 = 2.07e-33; // Ca₃(PO₄)₂: [Ca]³ [PO₄]²
  private readonly Ksp_CaHPO4 = 1e-7;      // CaHPO₄ ~ brushite/monetite family (approx)
  private readonly Ksp_CaSO4 = 2.4e-5;     // CaSO₄

  private readonly maxPhIter = 200;

  // ------------------------------
  // Public API
  // ------------------------------
  public calculateOptimalFertilizers(input: CalculationInput): CalculationResult {
    // validate
    const validation = this.validateInputs(input);
    if (!validation.ok) return this.createErrorResult(validation.message || 'Validation failed', input);

    const compatibilityWarnings = this.checkCompatibility(input);

    const requiredHPlusMol = this.calculateRequiredHPlus(input); // mol total for tank
    console.debug('Required H+ (mol):', requiredHPlusMol);

    if (requiredHPlusMol <= 0) {
      return {
        recommendedFertilizers: [],
        totalCost: 0,
        finalPh: input.pHInit,
        timeToEffect: input.t ? input.t('noEffectNeeded') : 'No effect needed',
        explanation: input.t ? input.t('waterPHAlreadyTarget') : 'Water pH is already at or below the target. No acidifier needed.',
        warnings: compatibilityWarnings,
        jarTestInstructions: input.t ? input.t('noJarTestRequired') : 'No jar-test required (pH already within target).',
        scientificReasoning: input.t ? input.t('noAcidAdditionRequired') : 'No acid addition required.'
      };
    }

    const selected = input.availableFertilizers.filter(av => av.isSelected !== false);
    if (selected.length === 0) {
      const errorMessage = input.t ? input.t('noFertilizersSelected') : 'No fertilizers available/selected.';
      return this.createErrorResult(errorMessage, input);
    }

    const timing = input.requiredEffectTiming ?? EffectTiming.IMMEDIATE;

    let recommendations: FertilizerRecommendation[] = [];
    let alternative: FertilizerRecommendation | undefined;

    if (timing === EffectTiming.IMMEDIATE) {
      recommendations = this.calculateImmediateEffect(selected, requiredHPlusMol, input);
      const bio = this.calculateBiologicalEffect(selected, requiredHPlusMol, input);
      alternative = bio.length > 0 ? bio[0] : undefined;
    } else {
      recommendations = this.calculateBiologicalEffect(selected, requiredHPlusMol, input);
      const imm = this.calculateImmediateEffect(selected, requiredHPlusMol, input);
      alternative = imm.length > 0 ? imm[0] : undefined;
    }

    // recompute final pH from total H+ actually added by recommendations
    const totalHAdded = recommendations.reduce((s, r) => s + this.calculateActualHPlusContribution(r.molesUsed, r.fertilizer, r.effectType), 0);
    const finalPh = this.recomputeFinalPh(input, totalHAdded);

    const totalCost = recommendations.reduce((s, r) => s + r.cost, 0);
    const explanation = this.generateDetailedExplanation(input, recommendations, finalPh);
    const scientificReasoning = this.generateScientificReasoning(input, recommendations, requiredHPlusMol);
    const warnings = [...compatibilityWarnings, ...this.generateSafetyWarnings(input, recommendations)];
    const jarTestInstructions = this.generateJarTestInstructions(input, recommendations);

    return {
      recommendedFertilizers: recommendations,
      alternativeRecommendation: alternative,
      totalCost,
      finalPh,
      timeToEffect: this.getTimeToEffect(timing, input),
      explanation,
      warnings,
      jarTestInstructions,
      scientificReasoning
    };
  }

  // ------------------------------
  // Validation & helpers
  // ------------------------------
  private validateInputs(input: CalculationInput): { ok: boolean; message?: string } {
    const errs: string[] = [];
    if (!input.volumeL || input.volumeL <= 0) {
      errs.push(input.t ? input.t('validationVolumeLRequired') : 'volumeL must be > 0');
    }
    if (!input.pHInit || input.pHInit <= 0) {
      errs.push(input.t ? input.t('validationPHInitRequired') : 'pHInit must be > 0');
    }
    if (!input.pHTarget || input.pHTarget <= 0) {
      errs.push(input.t ? input.t('validationPHTargetRequired') : 'pHTarget must be > 0');
    }
    if (input.pHInit <= input.pHTarget) {
      errs.push(input.t ? input.t('validationPHInitHigher') : 'pHInit must be higher than pHTarget (acidification)');
    }
    if (input.alkalinityMgLAsCaCO3 == null || input.alkalinityMgLAsCaCO3 < 0) {
      errs.push(input.t ? input.t('validationAlkalinityRequired') : 'alkalinityMgLAsCaCO3 required');
    }
    return errs.length === 0 ? { ok: true } : { ok: false, message: errs.join('; ') };
  }

  private createErrorResult(msg: string, input?: CalculationInput): CalculationResult {
    return {
      recommendedFertilizers: [],
      totalCost: 0,
      finalPh: 0,
      timeToEffect: input?.t ? input.t('errorTimeToEffect') : 'Error',
      explanation: msg,
      warnings: [msg],
      jarTestInstructions: '',
      scientificReasoning: ''
    };
  }

  // ------------------------------
  // Chemistry core
  // ------------------------------
  private alkalinityToMeqL(alk_mgL: number): number {
    return alk_mgL / 50.0; // meq/L
  }
  private meqLtoMolL(meqL: number): number {
    return meqL / 1000.0; // mol charge / L
  }

  // carbonate alpha fractions given H (mol/L)
  private carbonateAlphaFractions(H: number) {
    const H2 = H * H;
    const denom = H2 + this.Ka1 * H + this.Ka1 * this.Ka2;
    const alpha0 = H2 / denom;
    const alpha1 = (this.Ka1 * H) / denom;
    const alpha2 = (this.Ka1 * this.Ka2) / denom;
    return { alpha0, alpha1, alpha2 };
  }

  /**
   * Compute DIC (mol/L) from alkalinity (mg/L as CaCO3) and pH
   */
  private computeDICfromAlkAndpH(alk_mgL: number, pH: number): number {
    const Alk_meqL = this.alkalinityToMeqL(alk_mgL);
    const Alk_molL = this.meqLtoMolL(Alk_meqL);
    const H = Math.pow(10, -pH);
    const OH = this.Kw / H;
    const { alpha1, alpha2 } = this.carbonateAlphaFractions(H);
    const denom = (alpha1 + 2 * alpha2);
    if (denom <= 0) throw new Error('Invalid denom while computing DIC.');
    const DIC = (Alk_molL - OH + H) / denom; // mol/L
    return DIC;
  }

  private alkalinityFromDICandpH(DIC_molL: number, pH: number): number {
    const H = Math.pow(10, -pH);
    const OH = this.Kw / H;
    const { alpha1, alpha2 } = this.carbonateAlphaFractions(H);
    const Alk_molL = DIC_molL * (alpha1 + 2 * alpha2) + OH - H;
    return Alk_molL;
  }

  /**
   * Solve pH for given DIC (mol/L) and target alkalinity (mol charge/L)
   */
  private solvePhForDICAndAlk(DIC_molL: number, targetAlk_molL: number): number {
    const f = (pH: number) => this.alkalinityFromDICandpH(DIC_molL, pH) - targetAlk_molL;

    let lower = 2.0, upper = 11.0;
    let fL = f(lower), fU = f(upper);
    if (fL * fU > 0) {
      // try expand
      lower = 1.0; upper = 12.0; fL = f(lower); fU = f(upper);
      if (fL * fU > 0) {
        // fallback
        return fL < fU ? lower : upper;
      }
    }

    let mid = 7.0;
    for (let i = 0; i < this.maxPhIter; i++) {
      mid = 0.5 * (lower + upper);
      const fM = f(mid);
      if (Math.abs(fM) < 1e-12) return mid;
      if (fL * fM <= 0) {
        upper = mid; fU = fM;
      } else {
        lower = mid; fL = fM;
      }
      if (Math.abs(upper - lower) < 1e-6) break;
    }
    return mid;
  }

  // ------------------------------
  // Phosphate equilibrium (ADDED)
  // ------------------------------
  /**
   * Speciate phosphate at given H (mol/L) and total P (mol/L)
   * totalP: expressed as mol total phosphorus (not PO₄³⁻ mass). We return PO₄ species concentrations (mol/L).
   */
  private phosphateSystem(H: number, totalP_molL: number) {
    // Ka values already defined in constructor section as P_Ka1,.. etc.
    // Using alpha fractions:
    // denom = H^3 + Ka1*H^2 + Ka1*Ka2*H + Ka1*Ka2*Ka3
    const H3 = H * H * H;
    const denom = H3 + this.P_Ka1 * H * H + this.P_Ka1 * this.P_Ka2 * H + this.P_Ka1 * this.P_Ka2 * this.P_Ka3;
    if (denom <= 0) {
      return { H3PO4: 0, H2PO4: 0, HPO4: 0, PO4: 0 };
    }
    const alpha0 = H3 / denom;
    const alpha1 = this.P_Ka1 * H * H / denom;
    const alpha2 = this.P_Ka1 * this.P_Ka2 * H / denom;
    const alpha3 = this.P_Ka1 * this.P_Ka2 * this.P_Ka3 / denom;

    // return concentrations (mol/L)
    return {
      H3PO4: totalP_molL * alpha0,
      H2PO4: totalP_molL * alpha1,
      HPO4: totalP_molL * alpha2,
      PO4: totalP_molL * alpha3
    };
  }

  // ------------------------------
  // Precipitation checks (ADDED)
  // ------------------------------
  /**
   * Conservative precipitation checks using ionic product vs Ksp.
   * Ca_molL: mol/L of free Ca2+ (assumed from hardness; see conversion helper).
   * phosphateSpecies: returned by phosphateSystem() (mol/L).
   * sulfate_molL: mol/L sulfate present.
   */
  private precipitationCheck(Ca_molL: number, phosphateSpecies: { H3PO4: number; H2PO4: number; HPO4: number; PO4: number }, sulfate_molL: number, input?: CalculationInput) {
    const risks: string[] = [];

    // Check Ca₃(PO₄)₂: Ksp = [Ca]³ [PO₄]²
    // Use PO₄³⁻ concentration (phosphateSpecies.PO4)
    const PO4 = phosphateSpecies.PO4;
    if (Ca_molL > 0 && PO4 > 0) {
      const IP = Math.pow(Ca_molL, 3) * Math.pow(PO4, 2);
      if (IP > this.Ksp_Ca3PO42) {
        const warning = input?.t ? input.t('precipitationRiskCa3PO4') : 'Risk: Ca₃(PO₄)₂ precipitation (insoluble phosphate).';
        risks.push(warning);
      }
    }

    // Check CaHPO4: Ksp ~ [Ca2+][HPO4 2-]
    const HPO4 = phosphateSpecies.HPO4;
    if (Ca_molL > 0 && HPO4 > 0) {
      const IP2 = Ca_molL * HPO4;
      if (IP2 > this.Ksp_CaHPO4) {
        const warning = input?.t ? input.t('precipitationRiskCaHPO4') : 'Risk: CaHPO4 precipitation (brushite/monetite family).';
        risks.push(warning);
      }
    }

    // Check CaSO4 precipitation: Ksp = [Ca2+][SO4 2-]
    if (Ca_molL > 0 && sulfate_molL > 0) {
      const IP3 = Ca_molL * sulfate_molL;
      if (IP3 > this.Ksp_CaSO4) {
        const warning = input?.t ? input.t('precipitationRiskCaSO4') : 'Risk: CaSO4 (gypsum) precipitation.';
        risks.push(warning);
      }
    }

    return risks;
  }

  // ------------------------------
  // Required H+ calculation
  // ------------------------------
  private calculateRequiredHPlus(input: CalculationInput): number {
    const { alkalinityMgLAsCaCO3, pHInit, pHTarget, volumeL } = input;
    const Alk_init_meqL = this.alkalinityToMeqL(alkalinityMgLAsCaCO3);
    const Alk_init_molL = this.meqLtoMolL(Alk_init_meqL);

    const DIC_molL = this.computeDICfromAlkAndpH(alkalinityMgLAsCaCO3, pHInit);
    const Alk_target_molL = this.alkalinityFromDICandpH(DIC_molL, pHTarget);

    let Hneeded_molPerL = Alk_init_molL - Alk_target_molL;
    if (Hneeded_molPerL < 0) Hneeded_molPerL = 0;
    return Hneeded_molPerL * volumeL;
  }

  // ------------------------------
  // Fertilizer selection & dosing
  // ------------------------------
  private calculateImmediateEffect(selected: FertilizerAvailability[], requiredHPlusMol: number, input: CalculationInput) {
    return this.solveFertilizerDose(selected, requiredHPlusMol, input, 'immediate');
  }

  private calculateBiologicalEffect(selected: FertilizerAvailability[], requiredHPlusMol: number, input: CalculationInput) {
    // Prefer ammonium-based fertilizers if they have biologicalHperMol
    const ammoniumCandidates = selected.filter(s => s.fertilizer.type === FertilizerType.AMMONIUM_BASED && (s.fertilizer.biologicalHperMol ?? 0) > 0);
    const pool = ammoniumCandidates.length > 0 ? ammoniumCandidates : selected;
    return this.solveFertilizerDose(pool, requiredHPlusMol, input, 'biological');
  }



  /**
   * Main greedy solver with precipitation checks integrated (ADDED)
   */
  private solveFertilizerDose(availabilityList: FertilizerAvailability[], requiredHPlusMol: number, input: CalculationInput, effectMode: 'immediate' | 'biological'): FertilizerRecommendation[] {
    // Prepare cost-effectiveness sorting for all fertilizers (including MgSO4)
    const arr = availabilityList.map(av => {
        const f = av.fertilizer;
        const hPerMol = (effectMode === 'biological') ? (f.biologicalHperMol ?? f.immediateHperMol) : f.immediateHperMol;
        const effH = hPerMol > 0 ? hPerMol : 1e-12;
        // cost per mol H+ approx: pricePerKg / (mol fertilizer per kg * effH)
        // mol fertilizer per kg = 1000 / MW
        const molFertPerKg = 1000.0 / f.molecularWeight;
        const molHperKg = molFertPerKg * effH;
        const costPerMolH = (f.pricePerKg || 0) / Math.max(molHperKg, 1e-12);
        return { av, effH, costPerMolH };
      });

    arr.sort((a, b) => a.costPerMolH - b.costPerMolH);

    let remainingH = requiredHPlusMol;
    const recs: FertilizerRecommendation[] = [];

    // Estimate Ca mol/L from hardness (assume all hardness as Ca2+ conservative)
    // --- ADDED: hardness -> Ca mol/L conversion
    const hardness_mgL = input.waterHardnessMgLAsCaCO3 ?? 0;
    // meq/L = hardness / 50
    const hardness_meqL = hardness_mgL / 50.0;
    // mol charge per L = meq / 1000
    const molChargePerL = hardness_meqL / 1000.0;
    // assume all charge from Ca2+ (2 eq per mol Ca): mol Ca per L = molChargePerL / 2
    const Ca_molL_assumed = molChargePerL > 0 ? molChargePerL / 2.0 : 0;

    for (const item of arr) {
      if (remainingH <= 1e-12) break;
      const av = item.av;
      const f = av.fertilizer;
      const hPerMol = item.effH;
      if (hPerMol <= 0) continue;

      const maxMolAvailable = (av.availableAmountKg * 1000.0) / f.molecularWeight;
      
      let molNeeded: number;
      if (f.id === 'mgso4') {
        // MgSO4 dose calculator using carbonate equilibrium
        const pHInit = input.pHInit;
        const pHTarget = input.pHTarget;
        const alkalinity_mgL = input.alkalinityMgLAsCaCO3;
        const volumeL = input.volumeL;
        const efficiency = 0.15;
        const corrFactor = 1.0;
        
        // Constants (25°C)
        const Ka1 = 4.47e-7;
        const Ka2 = 4.67e-11;
        const Kw = 1e-14;
        
        // 1) Convert alkalinity to mol/L (charge)
        const Alk_molL = alkalinity_mgL / 50000.0; // mg/L -> mol·charge / L
        
        // Helper: alpha fractions for carbonate system at given H (mol/L)
        const carbonateAlphas = (H: number) => {
          const H2 = H * H;
          const denom = H2 + Ka1 * H + Ka1 * Ka2;
          return {
            alpha0: H2 / denom,
            alpha1: (Ka1 * H) / denom,
            alpha2: (Ka1 * Ka2) / denom
          };
        };
        
        // 2) Initial H and OH
        const H_init = Math.pow(10, -pHInit);
        const OH_init = Kw / H_init;
        
        // 3) Compute DIC from initial conditions
        const alphas_init = carbonateAlphas(H_init);
        const denom_init = (alphas_init.alpha1 + 2 * alphas_init.alpha2);
        if (denom_init <= 0) throw new Error('Invalid denom_init');
        const DIC_molL = (Alk_molL - OH_init + H_init) / denom_init;
        
        // 4) Compute target alkalinity (mol/L) for same DIC at target pH
        const H_target = Math.pow(10, -pHTarget);
        const OH_target = Kw / H_target;
        const alphas_target = carbonateAlphas(H_target);
        const Alk_target_molL = DIC_molL * (alphas_target.alpha1 + 2 * alphas_target.alpha2) + OH_target - H_target;
        
        // 5) H needed per L (mol/L)
        let h_mol_per_L = Alk_molL - Alk_target_molL;
        if (h_mol_per_L < 0) h_mol_per_L = 0;
        
        // 6) Total H needed (mol) for tank
        const H_need = h_mol_per_L * volumeL; // mol
        
        // 7) Moles of Mg-salt needed (accounting efficiency and corrFactor)
        const molMgSalt = H_need / (efficiency * corrFactor);
        
        molNeeded = Math.min(maxMolAvailable, molMgSalt);
      } else {
        // Standard calculation for other fertilizers
        molNeeded = Math.min(maxMolAvailable, remainingH / hPerMol);
      }
      
      if (molNeeded <= 1e-9) continue;

      const kgNeeded = (molNeeded * f.molecularWeight) / 1000.0;
      const cost = kgNeeded * f.pricePerKg;

      // Estimate ph contribution per L in mmol/L
      const phContribution_mmolL = (molNeeded * hPerMol) / input.volumeL * 1000.0;

      // Salt load estimate (rough)
      const saltLoad = this.estimateSaltLoadKgPerL(kgNeeded, f, input.volumeL);

      // --- ADDED: precipitation check for phosphate-containing fertilizers ---
      let precipitationRisks: string[] = [];
      let precipFlag = false;
      if ((f.phosphateMolPerMol ?? 0) > 0 || (f.sulfateMolPerMol ?? 0) > 0) {
        // compute added species concentrations (mol/L)
        const addedP_molL = (molNeeded * (f.phosphateMolPerMol ?? 0)) / input.volumeL; // mol P per L (as total P expressed as PO4 equiv)
        const addedSO4_molL = (molNeeded * (f.sulfateMolPerMol ?? 0)) / input.volumeL;
        // compute phosphate speciation at the target pH (conservative)
        const H_at_target = Math.pow(10, -input.pHTarget);
        const phosphateSpec = this.phosphateSystem(H_at_target, addedP_molL);
        const risks = this.precipitationCheck(Ca_molL_assumed, phosphateSpec, addedSO4_molL, input);
        if (risks.length > 0) {
          precipitationRisks = risks;
          precipFlag = true;
        }
      }

      const rec: FertilizerRecommendation = {
        fertilizer: f,
        amountKg: kgNeeded,
        amountG: kgNeeded * 1000.0,
        molesUsed: molNeeded,
        cost,
        effectType: effectMode,
        timeToEffect: this.getTimeToEffectForMode(effectMode, input),
        precipitationRisk: precipFlag,
        precipitationRisksList: precipitationRisks.length > 0 ? precipitationRisks : undefined,
        saltLoadIncrease_mS_cm_est: saltLoad,
        phContribution_mmolL
      };

      recs.push(rec);
      remainingH -= molNeeded * hPerMol;
    }

    // If some H demand remained unmet, we return partial recommendations and the caller should warn user
    return recs;
  }

  // ------------------------------
  // Salt & H+ helpers
  // ------------------------------
  private estimateSaltLoadKgPerL(amountKg: number, _fert: Fertilizer, volumeL: number): number {
    const gPerL = (amountKg * 1000.0) / volumeL;
    return gPerL * 1.7;
  }

  private calculateActualHPlusContribution(molUsed: number, fertilizer: Fertilizer, effectType: 'immediate' | 'biological'): number {
    const hPerMol = effectType === 'biological' ? (fertilizer.biologicalHperMol ?? fertilizer.immediateHperMol) : fertilizer.immediateHperMol;
    return molUsed * (hPerMol ?? 0);
  }

  // ------------------------------
  // Final pH recomputation
  // ------------------------------
  private recomputeFinalPh(input: CalculationInput, totalHAddedMol: number): number {
    const Alk_init_meqL = this.alkalinityToMeqL(input.alkalinityMgLAsCaCO3);
    const Alk_init_molL = this.meqLtoMolL(Alk_init_meqL);
    const H_added_molPerL = totalHAddedMol / input.volumeL;
    const Alk_final_molL = Alk_init_molL - H_added_molPerL;

    // Compute DIC from initial conditions
    const DIC_molL = this.computeDICfromAlkAndpH(input.alkalinityMgLAsCaCO3, input.pHInit);

    // Solve for pH
    const pHsol = this.solvePhForDICAndAlk(DIC_molL, Alk_final_molL);
    const finalPh = Math.max(2.5, Math.min(11.5, pHsol));
    return finalPh;
  }

  // ------------------------------
  // Warnings & output
  // ------------------------------
  private checkCompatibility(input: CalculationInput): string[] {
    const warns: string[] = [];
    if ((input.waterHardnessMgLAsCaCO3 ?? 0) > 150) {
      const phosphateSelected = input.availableFertilizers.some(av => av.isSelected !== false && av.fertilizer.precipitationRisk);
      if (phosphateSelected) {
        const warning = input.t ? 
          input.t('highWaterHardnessPrecipitation') : 
          'High water hardness + phosphate fertilizer selected → precipitation risk. Perform jar-test.';
        warns.push(warning);
      }
    }
    return warns;
  }

  private generateSafetyWarnings(input: CalculationInput, recommendations: FertilizerRecommendation[]): string[] {
    const warns: string[] = [];
    for (const rec of recommendations) {
      if (rec.saltLoadIncrease_mS_cm_est > 2.0) {
        const warning = input.t ? 
          input.t('highSaltLoadWarning', { 
            fertilizer: rec.fertilizer.name, 
            saltLoad: rec.saltLoadIncrease_mS_cm_est.toFixed(2) 
          }) : 
          `High salt load from ${rec.fertilizer.name} (~+${rec.saltLoadIncrease_mS_cm_est.toFixed(2)} mS/cm) - risk of phytotoxicity.`;
        warns.push(warning);
      }
      if (rec.effectType === 'immediate' && rec.amountKg > 10) {
        const warning = input.t ? 
          input.t('largeMassWarning', { 
            mass: rec.amountKg.toFixed(2), 
            fertilizer: rec.fertilizer.name 
          }) : 
          `Large immediate mass (${rec.amountKg.toFixed(2)} kg) of ${rec.fertilizer.name} recommended - consider alternatives.`;
        warns.push(warning);
      }
      if (rec.precipitationRisk && rec.precipitationRisksList) rec.precipitationRisksList.forEach(r => warns.push(`${rec.fertilizer.name}: ${r}`));
      if (rec.fertilizer.safetyRating === SafetyRating.CAUTION) {
        const warning = input.t ? 
          input.t('cautionHandling', { fertilizer: rec.fertilizer.name }) : 
          `${rec.fertilizer.name}: handle with caution.`;
        warns.push(warning);
      }
      if (rec.fertilizer.id === 'ammonium_nitrate') {
        const warning = input.t ? 
          input.t('ammoniumNitrateRegulation') : 
          'Ammonium nitrate might be regulated in some jurisdictions.';
        warns.push(warning);
      }
    }
    return warns;
  }

  private generateJarTestInstructions(input: CalculationInput, recs: FertilizerRecommendation[]): string {
    if (!recs || recs.length === 0) return '';
    const main = recs[0];
    const testDose_g = (main.amountG * 0.4); // 40% scaled to full tank
    const per1L = testDose_g / 1.0;
    
    if (input.t) {
      return input.t('jarTestInstructionDetailed', {
        amount: per1L.toFixed(2),
        percent: (40).toFixed(0),
        fertilizer: main.fertilizer.name
      });
    }
    
    // Fallback to English if no translation function
    let s = `JAR-TEST: Take 1 L sample. Add ${per1L.toFixed(2)} g (${(40).toFixed(0)}% of calculated dose scaled to 1 L) of ${main.fertilizer.name}. Stir 2-3 min, wait 30-60 min. Check for precipitate and measure pH. If precipitate observed, do NOT use this fertilizer / adjust.`;
    return s;
  }

  private generateDetailedExplanation(input: CalculationInput, recs: FertilizerRecommendation[], finalPh: number): string {
    if (!recs || recs.length === 0) {
      return input.t ? input.t('noSuitableFertilizer') : 'No suitable fertilizer recommendation found.';
    }
    
    const main = recs[0];
    const lines: string[] = [];
    
    if (input.t) {
      lines.push(input.t('addFertilizerToTank', {
        amount: main.amountG.toFixed(1),
        fertilizer: main.fertilizer.name,
        volume: input.volumeL
      }));
      lines.push(input.t('expectedFinalPH', { ph: finalPh.toFixed(2) }));
      lines.push(input.t('procedureInstructions'));
      lines.push(input.t('estimatedCost', {
        cost: main.cost.toFixed(2),
        currency: input.currency ?? ''
      }));
      if (main.precipitationRisk) {
        lines.push(input.t('precipitationWarning'));
      }
    } else {
      // Fallback to English
      lines.push(`Add ${main.amountG.toFixed(1)} g of ${main.fertilizer.name} to ${input.volumeL} L tank.`);
      lines.push(`Expected final pH (model): ${finalPh.toFixed(2)}.`);
      lines.push('Procedure: add ~1/3 of dose, mix, measure pH; then add remainder slowly while stirring until target reached.');
      lines.push(`Estimated cost: ${(main.cost).toFixed(2)} ${input.currency ?? ''}`);
      if (main.precipitationRisk) lines.push('Warning: precipitation risk flagged - perform jar-test.');
    }
    
    return lines.join('\n');
  }

  private generateScientificReasoning(input: CalculationInput, recs: FertilizerRecommendation[], requiredHPlusMol: number): string {
    const Alk_meqL = this.alkalinityToMeqL(input.alkalinityMgLAsCaCO3);
    const Alk_molL = this.meqLtoMolL(Alk_meqL);
    
    // Helper function to format scientific numbers in user-friendly way
    const formatScientific = (num: number): string => {
      if (num >= 1) return num.toFixed(4);
      if (num >= 0.001) return num.toFixed(6);
      if (num >= 0.000001) return `${(num * 1000000).toFixed(2)} × 10⁻⁶`;
      if (num >= 0.000000001) return `${(num * 1000000000).toFixed(2)} × 10⁻⁹`;
      return `${(num * 1000000000000).toFixed(2)} × 10⁻¹²`;
    };

    const lines: string[] = [];
    
    if (input.t) {
      lines.push(input.t('scientificBasisCarbonate'));
      lines.push(input.t('carbonateConstantsFormatted', {
        k1: formatScientific(this.Ka1),
        k2: formatScientific(this.Ka2),
        kw: formatScientific(this.Kw)
      }));
      lines.push(input.t('initialConditions', {
        initialPH: input.pHInit,
        targetPH: input.pHTarget,
        alkalinity: input.alkalinityMgLAsCaCO3,
        alkMolL: formatScientific(Alk_molL)
      }));
      lines.push(input.t('requiredHPlus', {
        hPlus: formatScientific(requiredHPlusMol),
        volume: input.volumeL
      }));
      if (recs.length > 0) {
        const main = recs[0];
        lines.push(input.t('selectedFertilizer', {
          fertilizer: main.fertilizer.name,
          moles: formatScientific(main.molesUsed)
        }));
      }
    } else {
      // Fallback to English
      lines.push('Scientific basis: carbonate system buffering and alkalinity neutralization.');
      lines.push(`K₁ = ${formatScientific(this.Ka1)}, K₂ = ${formatScientific(this.Ka2)}, Kw = ${formatScientific(this.Kw)} (25°C).`);
      lines.push(`Initial pH = ${input.pHInit}, Target pH = ${input.pHTarget}, Alkalinity = ${input.alkalinityMgLAsCaCO3} mg/L as CaCO₃ (~${formatScientific(Alk_molL)} mol/L charge).`);
      lines.push(`Required H⁺: ${formatScientific(requiredHPlusMol)} mol for ${input.volumeL} L.`);
      if (recs.length > 0) {
        const main = recs[0];
        lines.push(`Selected: ${main.fertilizer.name}, moles used: ${formatScientific(main.molesUsed)} mol.`);
      }
    }
    
    return lines.join('\n');
  }

  private getTimeToEffect(t: EffectTiming, input?: CalculationInput): string {
    if (input?.t) {
      switch (t) {
        case EffectTiming.IMMEDIATE: return input.t('minutesImmediate');
        case EffectTiming.WITHIN_24H: return input.t('hours12to24');
        case EffectTiming.NO_RUSH: return input.t('hours24to72');
        default: return input.t('timeUnknown');
      }
    }
    
    // Fallback to English
    switch (t) {
      case EffectTiming.IMMEDIATE: return 'minutes (immediate hydrolysis)';
      case EffectTiming.WITHIN_24H: return '12-24 hours';
      case EffectTiming.NO_RUSH: return '24-72 hours (biological nitrification)';
      default: return 'unknown';
    }
  }

  private getTimeToEffectForMode(effectMode: 'immediate' | 'biological', input?: CalculationInput): string {
    if (input?.t) {
      return effectMode === 'biological' ? input.t('hours24to72') : input.t('minutesImmediate');
    }
    
    // Fallback to English
    return effectMode === 'biological' ? '24-72 hours (nitrification)' : 'minutes';
  }
}