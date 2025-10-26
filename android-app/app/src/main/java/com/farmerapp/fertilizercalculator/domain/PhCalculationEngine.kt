package com.farmerapp.fertilizercalculator.domain

import com.farmerapp.fertilizercalculator.data.model.*
import kotlin.math.*

/**
 * Advanced pH calculation engine based on carbonate chemistry
 * Matches the web app's PhCalculationEngine functionality
 */
class PhCalculationEngine {

    // Carbonate constants at 25°C
    private val Ka1 = 4.47e-7
    private val Ka2 = 4.67e-11
    private val Kw = 1e-14

    // Phosphate pKas (25°C)
    private val P_Ka1 = 7.11e-3   // pKa1 (H₃PO₄ → H₂PO₄⁻)
    private val P_Ka2 = 6.32e-8   // pKa2 (H₂PO₄⁻ → HPO₄²⁻)
    private val P_Ka3 = 4.49e-13  // pKa3 (HPO₄²⁻ → PO₄³⁻)

    // Ksp values for precipitation checks
    private val Ksp_Ca3PO42 = 2.07e-33 // Ca₃(PO₄)₂
    private val Ksp_CaHPO4 = 1e-7      // CaHPO₄
    private val Ksp_CaSO4 = 2.4e-5     // CaSO₄

    private val maxPhIter = 200

    /**
     * Calculate optimal fertilizer combination using scientific algorithms
     */
    fun calculateOptimalFertilizers(input: CalculationInput): CalculationResult {
        // Validate inputs
        val validation = validateInputs(input)
        if (!validation.first) {
            return createErrorResult(validation.second)
        }

        val compatibilityWarnings = checkCompatibility(input)
        val requiredHPlusMol = calculateRequiredHPlus(input)

        if (requiredHPlusMol <= 0) {
            return CalculationResult(
                recommendedFertilizers = emptyList(),
                totalCost = 0.0,
                finalPh = input.pHInit,
                timeToEffect = "Not needed",
                explanation = "Water already has optimal pH. Addition of acidic fertilizers is not needed.",
                warnings = compatibilityWarnings,
                scientificReasoning = "Acid addition not needed."
            )
        }

        val selected = input.availableFertilizers.filter { it.isSelected }
        if (selected.isEmpty()) {
            return createErrorResult("No fertilizer selected for calculation.")
        }

        val timing = input.requiredEffectTiming
        val recommendations = when (timing) {
            EffectTiming.IMMEDIATE -> calculateImmediateEffect(selected, requiredHPlusMol, input)
            else -> calculateBiologicalEffect(selected, requiredHPlusMol, input)
        }

        // Calculate final pH from actual H+ added
        val totalHAdded = recommendations.sumOf { rec ->
            calculateActualHPlusContribution(rec.amountKg, rec.fertilizer, rec.effectType)
        }
        val finalPh = recomputeFinalPh(input, totalHAdded)

        val totalCost = recommendations.sumOf { it.cost }
        val explanation = generateDetailedExplanation(input, recommendations, finalPh)
        val scientificReasoning = generateScientificReasoning(input, recommendations, requiredHPlusMol)
        val warnings = compatibilityWarnings + generateSafetyWarnings(input, recommendations)
        val jarTestInstructions = generateJarTestInstructions(recommendations)

        return CalculationResult(
            recommendedFertilizers = recommendations,
            totalCost = totalCost,
            finalPh = finalPh,
            timeToEffect = getTimeToEffect(timing),
            explanation = explanation,
            warnings = warnings,
            jarTestInstructions = jarTestInstructions,
            scientificReasoning = scientificReasoning
        )
    }

    private fun validateInputs(input: CalculationInput): Pair<Boolean, String> {
        val errors = mutableListOf<String>()
        
        if (input.volumeL <= 0) errors.add("Volume must be greater than 0")
        if (input.pHInit <= 0) errors.add("Initial pH must be greater than 0")
        if (input.pHTarget <= 0) errors.add("Target pH must be greater than 0")
        if (input.pHInit <= input.pHTarget) errors.add("Initial pH must be higher than target pH")
        if (input.alkalinityMgLAsCaCO3 < 0) errors.add("Alkalinity cannot be negative")
        
        return if (errors.isEmpty()) {
            Pair(true, "")
        } else {
            Pair(false, errors.joinToString("; "))
        }
    }

    private fun createErrorResult(message: String): CalculationResult {
        return CalculationResult(
            recommendedFertilizers = emptyList(),
            totalCost = 0.0,
            finalPh = 0.0,
            timeToEffect = "Error",
            explanation = message,
            warnings = listOf(message),
            scientificReasoning = ""
        )
    }

    private fun alkalinityToMeqL(alk_mgL: Double): Double = alk_mgL / 50.0
    private fun meqLtoMolL(meqL: Double): Double = meqL / 1000.0

    private fun carbonateAlphaFractions(H: Double): Triple<Double, Double, Double> {
        val H2 = H * H
        val denom = H2 + Ka1 * H + Ka1 * Ka2
        val alpha0 = H2 / denom
        val alpha1 = (Ka1 * H) / denom
        val alpha2 = (Ka1 * Ka2) / denom
        return Triple(alpha0, alpha1, alpha2)
    }

    private fun computeDICfromAlkAndpH(alk_mgL: Double, pH: Double): Double {
        val Alk_meqL = alkalinityToMeqL(alk_mgL)
        val Alk_molL = meqLtoMolL(Alk_meqL)
        val H = 10.0.pow(-pH)
        val OH = Kw / H
        val (_, alpha1, alpha2) = carbonateAlphaFractions(H)
        val denom = (alpha1 + 2 * alpha2)
        if (denom <= 0) throw IllegalStateException("Invalid denom while computing DIC.")
        return (Alk_molL - OH + H) / denom
    }

    private fun alkalinityFromDICandpH(DIC_molL: Double, pH: Double): Double {
        val H = 10.0.pow(-pH)
        val OH = Kw / H
        val (_, alpha1, alpha2) = carbonateAlphaFractions(H)
        return DIC_molL * (alpha1 + 2 * alpha2) + OH - H
    }

    private fun solvePhForDICAndAlk(DIC_molL: Double, targetAlk_molL: Double): Double {
        val f = { pH: Double -> alkalinityFromDICandpH(DIC_molL, pH) - targetAlk_molL }

        var lower = 2.0
        var upper = 11.0
        var fL = f(lower)
        var fU = f(upper)
        
        if (fL * fU > 0) {
            lower = 1.0
            upper = 12.0
            fL = f(lower)
            fU = f(upper)
            if (fL * fU > 0) {
                return if (fL < fU) lower else upper
            }
        }

        var mid = 7.0
        repeat(maxPhIter) {
            mid = 0.5 * (lower + upper)
            val fM = f(mid)
            if (abs(fM) < 1e-12) return mid
            if (fL * fM <= 0) {
                upper = mid
                fU = fM
            } else {
                lower = mid
                fL = fM
            }
            if (abs(upper - lower) < 1e-6) return mid
        }
        return mid
    }

    private fun calculateRequiredHPlus(input: CalculationInput): Double {
        val Alk_init_meqL = alkalinityToMeqL(input.alkalinityMgLAsCaCO3)
        val Alk_init_molL = meqLtoMolL(Alk_init_meqL)

        val DIC_molL = computeDICfromAlkAndpH(input.alkalinityMgLAsCaCO3, input.pHInit)
        val Alk_target_molL = alkalinityFromDICandpH(DIC_molL, input.pHTarget)

        var Hneeded_molPerL = Alk_init_molL - Alk_target_molL
        if (Hneeded_molPerL < 0) Hneeded_molPerL = 0.0
        return Hneeded_molPerL * input.volumeL
    }

    private fun calculateImmediateEffect(
        selected: List<FertilizerAvailability>,
        requiredHPlusMol: Double,
        input: CalculationInput
    ): List<FertilizerRecommendation> {
        return solveFertilizerDose(selected, requiredHPlusMol, input, "immediate")
    }

    private fun calculateBiologicalEffect(
        selected: List<FertilizerAvailability>,
        requiredHPlusMol: Double,
        input: CalculationInput
    ): List<FertilizerRecommendation> {
        val ammoniumCandidates = selected.filter { 
            it.fertilizer.type == FertilizerType.AMMONIUM_BASED && 
            (it.fertilizer.nitrificationPotential ?: 0.0) > 0 
        }
        val pool = if (ammoniumCandidates.isNotEmpty()) ammoniumCandidates else selected
        return solveFertilizerDose(pool, requiredHPlusMol, input, "biological")
    }



    private fun solveFertilizerDose(
        availabilityList: List<FertilizerAvailability>,
        requiredHPlusMol: Double,
        input: CalculationInput,
        effectMode: String
    ): List<FertilizerRecommendation> {
        
        // Prepare cost-effectiveness sorting for all fertilizers (including MgSO4)
        val arr = availabilityList.map { av ->
            val f = av.fertilizer
            val hPerMol = if (effectMode == "biological") {
                f.nitrificationPotential ?: f.acidityStrength
            } else {
                f.acidityStrength
            }
            val effH = if (hPerMol > 0) hPerMol else 1e-12
            val molFertPerKg = 1000.0 / f.molecularWeight
            val molHperKg = molFertPerKg * effH
            val costPerMolH = f.pricePerKg / max(molHperKg, 1e-12)
            Triple(av, effH, costPerMolH)
        }

        val sortedArr = arr.sortedBy { it.third }
        var remainingH = requiredHPlusMol
        val recs = mutableListOf<FertilizerRecommendation>()

        for ((av, effH, _) in sortedArr) {
            if (remainingH <= 1e-12) break
            val f = av.fertilizer
            if (effH <= 0) continue

            val maxMolAvailable = (av.availableAmountKg * 1000.0) / f.molecularWeight
            
            val molNeeded = if (f.id == "mgso4") {
                // MgSO4 dose calculator using carbonate equilibrium
                val pHInit = input.pHInit
                val pHTarget = input.pHTarget
                val alkalinity_mgL = input.alkalinityMgLAsCaCO3
                val volumeL = input.volumeL
                val efficiency = 0.15
                val corrFactor = 1.0
                val temperatureC = input.temperatureC ?: 25.0
                
                // Constants (25°C)
                val Ka1 = 4.47e-7
                val Ka2 = 4.67e-11
                val Kw = 1e-14
                val MW = 246.47 // g/mol for MgSO4·7H2O
                
                // 1) Convert alkalinity to mol/L (charge)
                val Alk_molL = alkalinity_mgL / 50000.0 // mg/L -> mol·charge / L
                
                // Helper: alpha fractions for carbonate system at given H (mol/L)
                fun carbonateAlphas(H: Double): Triple<Double, Double, Double> {
                    val H2 = H * H
                    val denom = H2 + Ka1 * H + Ka1 * Ka2
                    return Triple(
                        H2 / denom, // alpha0
                        (Ka1 * H) / denom, // alpha1
                        (Ka1 * Ka2) / denom // alpha2
                    )
                }
                
                // 2) Initial H and OH
                val H_init = 10.0.pow(-pHInit)
                val OH_init = Kw / H_init
                
                // 3) Compute DIC from initial conditions
                val alphas_init = carbonateAlphas(H_init)
                val denom_init = (alphas_init.second + 2 * alphas_init.third)
                if (denom_init <= 0) throw Error("Invalid denom_init")
                val DIC_molL = (Alk_molL - OH_init + H_init) / denom_init
                
                // 4) Compute target alkalinity (mol/L) for same DIC at target pH
                val H_target = 10.0.pow(-pHTarget)
                val OH_target = Kw / H_target
                val alphas_target = carbonateAlphas(H_target)
                val Alk_target_molL = DIC_molL * (alphas_target.second + 2 * alphas_target.third) + OH_target - H_target
                
                // 5) H needed per L (mol/L)
                var h_mol_per_L = Alk_molL - Alk_target_molL
                if (h_mol_per_L < 0) h_mol_per_L = 0.0
                
                // 6) Total H needed (mol) for tank
                val H_need = h_mol_per_L * volumeL // mol
                
                // 7) Moles of Mg-salt needed (accounting efficiency and corrFactor)
                val molMgSalt = H_need / (efficiency * corrFactor)
                
                min(maxMolAvailable, molMgSalt)
            } else {
                // Standard calculation for other fertilizers
                min(maxMolAvailable, remainingH / effH)
            }
            
            if (molNeeded <= 1e-9) continue

            val kgNeeded = (molNeeded * f.molecularWeight) / 1000.0
            val cost = kgNeeded * f.pricePerKg
            val phContribution = (molNeeded * effH) / input.volumeL * 1000.0
            val saltLoad = estimateSaltLoad(kgNeeded, f, input.volumeL)

            val rec = FertilizerRecommendation(
                fertilizer = f,
                amountKg = kgNeeded,
                amountG = kgNeeded * 1000.0,
                cost = cost,
                phContribution = phContribution,
                effectType = effectMode,
                timeToEffect = getTimeToEffectForMode(effectMode),
                sideEffects = emptyList(),
                precipitationRisk = f.precipitationRisk ?: false,
                saltLoadIncrease = saltLoad
            )

            recs.add(rec)
            remainingH -= molNeeded * effH
        }

        return recs
    }

    private fun estimateSaltLoad(amountKg: Double, fertilizer: AcidicFertilizer, volumeL: Double): Double {
        val gPerL = (amountKg * 1000.0) / volumeL
        return gPerL * 1.7
    }

    private fun calculateActualHPlusContribution(
        amountKg: Double,
        fertilizer: AcidicFertilizer,
        effectType: String
    ): Double {
        val molUsed = (amountKg * 1000.0) / fertilizer.molecularWeight
        val hPerMol = if (effectType == "biological") {
            fertilizer.nitrificationPotential ?: fertilizer.acidityStrength
        } else {
            fertilizer.acidityStrength
        }
        return molUsed * hPerMol
    }

    private fun recomputeFinalPh(input: CalculationInput, totalHAddedMol: Double): Double {
        val Alk_init_meqL = alkalinityToMeqL(input.alkalinityMgLAsCaCO3)
        val Alk_init_molL = meqLtoMolL(Alk_init_meqL)
        val H_added_molPerL = totalHAddedMol / input.volumeL
        val Alk_final_molL = Alk_init_molL - H_added_molPerL

        val DIC_molL = computeDICfromAlkAndpH(input.alkalinityMgLAsCaCO3, input.pHInit)
        val pHsol = solvePhForDICAndAlk(DIC_molL, Alk_final_molL)
        return max(2.5, min(11.5, pHsol))
    }

    private fun checkCompatibility(input: CalculationInput): List<String> {
        val warns = mutableListOf<String>()
        if (input.waterHardnessMgLAsCaCO3 > 150) {
            val phosphateSelected = input.availableFertilizers.any { 
                it.isSelected && (it.fertilizer.precipitationRisk ?: false)
            }
            if (phosphateSelected) {
                warns.add("High water hardness + phosphate fertilizer → precipitation risk. Perform jar-test.")
            }
        }
        return warns
    }

    private fun generateSafetyWarnings(
        input: CalculationInput,
        recommendations: List<FertilizerRecommendation>
    ): List<String> {
        val warns = mutableListOf<String>()
        for (rec in recommendations) {
            if (rec.saltLoadIncrease > 2.0) {
                warns.add("High salt load from ${rec.fertilizer.name} (~+${String.format("%.2f", rec.saltLoadIncrease)} mS/cm) - phytotoxicity risk.")
            }
            if (rec.effectType == "immediate" && rec.amountKg > 10) {
                warns.add("Large mass (${String.format("%.2f", rec.amountKg)} kg) ${rec.fertilizer.name} - consider alternatives.")
            }
            if (rec.fertilizer.safetyRating == SafetyRating.CAUTION) {
                warns.add("${rec.fertilizer.name}: use with caution.")
            }
            if (rec.fertilizer.id == "an") {
                warns.add("Ammonium nitrate may be regulated in some jurisdictions.")
            }
        }
        return warns
    }

    private fun generateJarTestInstructions(recs: List<FertilizerRecommendation>): String {
        if (recs.isEmpty()) return ""
        val main = recs[0]
        val testDose_g = main.amountG * 0.4
        val per1L = testDose_g / 1.0
        
        return "JAR-TEST: Take 1 L sample. Add ${String.format("%.2f", per1L)} g (40% of calculated dose scaled to 1 L) ${main.fertilizer.name}. Stir 2-3 min, wait 30-60 min. Check for precipitate and measure pH."
    }

    private fun generateDetailedExplanation(
        input: CalculationInput,
        recs: List<FertilizerRecommendation>,
        finalPh: Double
    ): String {
        if (recs.isEmpty()) return "No suitable fertilizer recommendations found."
        
        val main = recs[0]
        return buildString {
            appendLine("Add ${String.format("%.1f", main.amountG)} g ${main.fertilizer.name} to ${input.volumeL} L tank.")
            appendLine("Expected final pH: ${String.format("%.2f", finalPh)}")
            appendLine("Procedure: add ~1/3 of dose, mix, measure pH; then add remainder slowly while stirring until target reached.")
            appendLine("Estimated cost: ${String.format("%.2f", main.cost)} $")
            if (main.precipitationRisk) {
                appendLine("Warning: precipitation risk flagged - perform jar-test.")
            }
        }
    }

    private fun generateScientificReasoning(
        input: CalculationInput,
        recs: List<FertilizerRecommendation>,
        requiredHPlusMol: Double
    ): String {
        val Alk_meqL = alkalinityToMeqL(input.alkalinityMgLAsCaCO3)
        val Alk_molL = meqLtoMolL(Alk_meqL)
        
        return buildString {
            appendLine("Scientific basis: carbonate system buffering and alkalinity neutralization.")
            appendLine("K₁ = ${String.format("%.2e", Ka1)}, K₂ = ${String.format("%.2e", Ka2)}, Kw = ${String.format("%.2e", Kw)} (25°C).")
            appendLine("Initial pH = ${input.pHInit}, Target pH = ${input.pHTarget}, Alkalinity = ${input.alkalinityMgLAsCaCO3} mg/L as CaCO₃ (~${String.format("%.6f", Alk_molL)} mol/L charge).")
            appendLine("Required H⁺: ${String.format("%.6f", requiredHPlusMol)} mol for ${input.volumeL} L.")
            if (recs.isNotEmpty()) {
                val main = recs[0]
                val molUsed = (main.amountKg * 1000.0) / main.fertilizer.molecularWeight
                appendLine("Selected: ${main.fertilizer.name}, moles used: ${String.format("%.6f", molUsed)} mol.")
            }
        }
    }

    private fun getTimeToEffect(timing: EffectTiming): String {
        return when (timing) {
            EffectTiming.IMMEDIATE -> "minutes (immediate hydrolysis)"
            EffectTiming.WITHIN_24H -> "12-24 hours"
            EffectTiming.NO_RUSH -> "24-72 hours (biological nitrification)"
        }
    }

    private fun getTimeToEffectForMode(effectMode: String): String {
        return if (effectMode == "biological") "24-72 hours (nitrification)" else "minutes"
    }
}