import { useState, useCallback, useEffect, useRef } from 'react';
import { FertilizerCalculatorState, CalculationResult, EffectTiming, AcidicFertilizer, SafetyRating, FertilizerType } from '../types/fertilizer';
import { fertilizerDB, Fertilizer } from '../data/fertilizers';
import { PhCalculationEngine } from '../services/phCalculationEngine';
import { useTranslation } from './useTranslation';

// Determine safety rating based on fertilizer properties
const getSafetyRating = (fertilizer: Fertilizer): SafetyRating => {
  // Ammonium nitrate is restricted due to security concerns
  if (fertilizer.id === 'an') {
    return SafetyRating.RESTRICTED;
  }

  // High nitrogen content fertilizers require more caution
  if (fertilizer.N > 30) {
    return SafetyRating.CAUTION;
  }

  // Phosphate-containing fertilizers can cause precipitation
  if (fertilizer.containsPhosphate) {
    return SafetyRating.CAUTION;
  }

  // Complex NPK fertilizers require careful handling
  if (fertilizer.id === 'npk') {
    return SafetyRating.CAUTION;
  }

  // Simple sulfate fertilizers are generally safe
  return SafetyRating.SAFE;
};

// Adapter to convert new fertilizer format to old format
const convertFertilizerToOldFormat = (fertilizer: Fertilizer): AcidicFertilizer => {
  return {
    id: fertilizer.id,
    name: fertilizer.name, // This will be a translation key, handled in components
    chemicalFormula: fertilizer.formula,
    molecularWeight: fertilizer.molarMass,
    acidityStrength: fertilizer.acidityImmediate * 0.01, // Convert to approximate pH reduction per g/L
    nitrificationPotential: fertilizer.acidityBiological,
    ammoniumIons: fertilizer.N > 0 ? 1 : 0, // Simplified estimation
    pricePerKg: fertilizer.pricePerKg.UAH || 30, // Default to UAH price or fallback
    availability: true,
    description: `N: ${fertilizer.N}%, P₂O₅: ${fertilizer.P2O5}%, S: ${fertilizer.S}%`, // Remove name from description
    safetyRating: getSafetyRating(fertilizer),
    type: fertilizer.N > 0 ? FertilizerType.AMMONIUM_BASED : FertilizerType.SULFATE_FERTILIZER,
    solubility: 400, // Default solubility
    purity: 0.95,
    nutritionalBenefits: [
      ...(fertilizer.N > 0 ? [`${fertilizer.N}% N`] : []),
      ...(fertilizer.P2O5 > 0 ? [`${fertilizer.P2O5}% P₂O₅`] : []),
      ...(fertilizer.S > 0 ? [`${fertilizer.S}% S`] : [])
    ],
    precipitationRisk: fertilizer.containsPhosphate || fertilizer.containsSulfate
  };
};

const SAFE_ACIDIC_FERTILIZERS = fertilizerDB.map(convertFertilizerToOldFormat);

const initialState: FertilizerCalculatorState = {
  // Required inputs
  volumeL: 1000,
  pHInit: 7.0,
  pHTarget: 5.8,
  alkalinityMgLAsCaCO3: 150,

  // Optional inputs with defaults
  temperatureC: 25,
  waterHardnessMgLAsCaCO3: 100,
  caIonsMgL: 0,
  mgIonsMgL: 0,
  selectedFertilizer: '',
  fertilizerPurity: 95,
  requiredEffectTiming: EffectTiming.NO_RUSH,
  countryLocale: 'uk',
  budgetConstraint: 0,

  availableFertilizers: SAFE_ACIDIC_FERTILIZERS.map((fertilizer, index) => ({
    fertilizer,
    availableAmountKg: 10, // Default available amount
    isSelected: index === 0 // Select the first fertilizer (MAP) by default
  })),
  calculationResult: null,
  isCalculating: false,
  showExpertMode: false
};

export const useFertilizerCalculator = () => {
  const [state, setState] = useState<FertilizerCalculatorState>(initialState);
  const calculationEngine = new PhCalculationEngine();
  const { t, currentLanguage } = useTranslation();
  const previousLanguage = useRef(currentLanguage);

  const updateVolume = useCallback((volume: string) => {
    // Allow empty string for editing, only convert to number if there's a valid value
    if (volume === '') {
      setState(prev => ({ ...prev, volumeL: '' as any }));
    } else {
      const numericVolume = parseFloat(volume);
      if (!isNaN(numericVolume)) {
        setState(prev => ({ ...prev, volumeL: numericVolume }));
      }
    }
  }, []);

  const updatePHInit = useCallback((ph: string) => {
    // Allow empty string for editing, only convert to number if there's a valid value
    if (ph === '') {
      setState(prev => ({ ...prev, pHInit: '' as any }));
    } else {
      const numericPh = parseFloat(ph);
      if (!isNaN(numericPh)) {
        setState(prev => ({ ...prev, pHInit: numericPh }));
      }
    }
  }, []);

  const updatePHTarget = useCallback((ph: string) => {
    // Allow empty string for editing, only convert to number if there's a valid value
    if (ph === '') {
      setState(prev => ({ ...prev, pHTarget: '' as any }));
    } else {
      const numericPh = parseFloat(ph);
      if (!isNaN(numericPh)) {
        setState(prev => ({ ...prev, pHTarget: numericPh }));
      }
    }
  }, []);

  const updateAlkalinity = useCallback((alkalinity: string) => {
    // Allow empty string for editing, only convert to number if there's a valid value
    if (alkalinity === '') {
      setState(prev => ({ ...prev, alkalinityMgLAsCaCO3: '' as any }));
    } else {
      const numericAlkalinity = parseFloat(alkalinity);
      if (!isNaN(numericAlkalinity)) {
        setState(prev => ({ ...prev, alkalinityMgLAsCaCO3: numericAlkalinity }));
      }
    }
  }, []);

  const updateTemperature = useCallback((temperature: string) => {
    const numericTemperature = parseFloat(temperature) || 25;
    setState(prev => ({ ...prev, temperatureC: numericTemperature }));
  }, []);

  const updateWaterHardness = useCallback((hardness: string) => {
    const numericHardness = parseFloat(hardness) || 0;
    setState(prev => ({ ...prev, waterHardnessMgLAsCaCO3: numericHardness }));
  }, []);

  const updateFertilizerPurity = useCallback((purity: string) => {
    // Allow empty string for editing, only convert to number if there's a valid value
    if (purity === '') {
      setState(prev => ({ ...prev, fertilizerPurity: '' as any }));
    } else {
      const numericPurity = parseFloat(purity);
      if (!isNaN(numericPurity)) {
        setState(prev => ({ ...prev, fertilizerPurity: numericPurity }));
      }
    }
  }, []);

  const updateEffectTiming = useCallback((timing: EffectTiming) => {
    setState(prev => ({ ...prev, requiredEffectTiming: timing }));
  }, []);

  const toggleExpertMode = useCallback(() => {
    setState(prev => ({ ...prev, showExpertMode: !prev.showExpertMode }));
  }, []);

  const updateFertilizerAvailability = useCallback((fertilizerId: string, amount: string, isSelected: boolean) => {
    const numericAmount = parseFloat(amount) || 0;
    setState(prev => ({
      ...prev,
      availableFertilizers: prev.availableFertilizers.map(availability =>
        availability.fertilizer.id === fertilizerId
          ? { ...availability, availableAmountKg: numericAmount, isSelected }
          : availability
      )
    }));
  }, []);

  const calculateFertilizers = useCallback(async () => {
    setState(prev => ({ ...prev, isCalculating: true }));

    try {
      // Simulate async calculation
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create translation helper function for the engine
      const translateWithParams = (key: string, params?: Record<string, any>) => {
        // Use the translation hook's translate function if available
        if (typeof (t as any).translate === 'function') {
          return (t as any).translate(key, params);
        }

        // Fallback to direct property access
        let translation = (t as any)[key];

        // If translation is missing, try to get it from the translation object
        if (!translation && typeof translation !== 'string') {
          console.warn(`Missing translation for key: ${key} in language`);
          // Return the key as fallback, which will be handled by the UI
          return `[${key}]`;
        }

        // Handle parameter substitution
        if (params && translation && typeof translation === 'string') {
          Object.entries(params).forEach(([paramKey, value]) => {
            translation = translation.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
          });
        }

        return translation || `[${key}]`;
      };

      // Convert string values to numbers with defaults for calculation
      const volumeL = typeof state.volumeL === 'string' ? (parseFloat(state.volumeL) || 1000) : state.volumeL;
      const pHInit = typeof state.pHInit === 'string' ? (parseFloat(state.pHInit) || 7.0) : state.pHInit;
      const pHTarget = typeof state.pHTarget === 'string' ? (parseFloat(state.pHTarget) || 5.8) : state.pHTarget;
      const alkalinityMgLAsCaCO3 = typeof state.alkalinityMgLAsCaCO3 === 'string' ? (parseFloat(state.alkalinityMgLAsCaCO3) || 150) : state.alkalinityMgLAsCaCO3;
      const fertilizerPurity = typeof state.fertilizerPurity === 'string' ? 0.95 : (state.fertilizerPurity / 100);

      // Convert fertilizer availability to new engine format
      const convertedAvailability = state.availableFertilizers.map(av => {
        const originalFertilizer = fertilizerDB.find(f => f.id === av.fertilizer.id);
        if (!originalFertilizer) {
          throw new Error(`Fertilizer ${av.fertilizer.id} not found in database`);
        }

        // Get translated fertilizer name
        const fertilizerNames = (t as any).fertilizerNames || {};
        const translatedName = fertilizerNames[originalFertilizer.id] || originalFertilizer.name;

        return {
          fertilizer: {
            id: originalFertilizer.id,
            name: translatedName, // Use translated name
            molecularWeight: originalFertilizer.molarMass,
            immediateHperMol: originalFertilizer.acidityImmediate,
            biologicalHperMol: originalFertilizer.acidityBiological,
            phosphateMolPerMol: originalFertilizer.containsPhosphate ? 1.0 : 0,
            sulfateMolPerMol: originalFertilizer.containsSulfate ? 1.0 : 0,
            precipitationRisk: originalFertilizer.containsPhosphate || originalFertilizer.containsSulfate,
            pricePerKg: originalFertilizer.pricePerKg.UAH || 30,
            type: originalFertilizer.N > 0 ? 'AMMONIUM_BASED' as any : 'OTHER' as any,
            purity: fertilizerPurity
          },
          availableAmountKg: av.availableAmountKg,
          isSelected: av.isSelected
        };
      });

      const input = {
        volumeL: volumeL,
        pHInit: pHInit,
        pHTarget: pHTarget,
        alkalinityMgLAsCaCO3: alkalinityMgLAsCaCO3,
        temperatureC: state.temperatureC,
        waterHardnessMgLAsCaCO3: state.waterHardnessMgLAsCaCO3,
        availableFertilizers: convertedAvailability,
        requiredEffectTiming: state.requiredEffectTiming,
        currency: 'UAH',
        t: translateWithParams
      };

      const engineResult = calculationEngine.calculateOptimalFertilizers(input);

      // Helper function to get translated fertilizer
      const getTranslatedFertilizer = (fertilizerId: string) => {
        const originalFertilizer = SAFE_ACIDIC_FERTILIZERS.find(f => f.id === fertilizerId) || convertFertilizerToOldFormat(fertilizerDB[0]);
        const fertilizerNames = (t as any).fertilizerNames || {};
        return {
          ...originalFertilizer,
          name: fertilizerNames[originalFertilizer.id] || originalFertilizer.name
        };
      };

      // Convert engine result to UI format
      const convertedResult: CalculationResult = {
        ...engineResult,
        recommendedFertilizers: engineResult.recommendedFertilizers.map(rec => ({
          fertilizer: getTranslatedFertilizer(rec.fertilizer.id),
          amountKg: rec.amountKg,
          amountG: rec.amountG,
          cost: rec.cost,
          phContribution: rec.phContribution_mmolL || 0,
          effectType: rec.effectType,
          timeToEffect: rec.timeToEffect,
          sideEffects: rec.notes || [],
          precipitationRisk: rec.precipitationRisk,
          saltLoadIncrease: rec.saltLoadIncrease_mS_cm_est
        })),
        alternativeRecommendation: engineResult.alternativeRecommendation ? {
          fertilizer: getTranslatedFertilizer(engineResult.alternativeRecommendation.fertilizer.id),
          amountKg: engineResult.alternativeRecommendation.amountKg,
          amountG: engineResult.alternativeRecommendation.amountG,
          cost: engineResult.alternativeRecommendation.cost,
          phContribution: engineResult.alternativeRecommendation.phContribution_mmolL || 0,
          effectType: engineResult.alternativeRecommendation.effectType,
          timeToEffect: engineResult.alternativeRecommendation.timeToEffect,
          sideEffects: engineResult.alternativeRecommendation.notes || [],
          precipitationRisk: engineResult.alternativeRecommendation.precipitationRisk,
          saltLoadIncrease: engineResult.alternativeRecommendation.saltLoadIncrease_mS_cm_est
        } : undefined
      };

      setState(prev => ({
        ...prev,
        calculationResult: convertedResult,
        isCalculating: false
      }));
    } catch (error) {
      const errorResult: CalculationResult = {
        recommendedFertilizers: [],
        totalCost: 0,
        finalPh: 0,
        timeToEffect: (t as any).errorTimeToEffect || 'Помилка',
        explanation: `Помилка розрахунку: ${error instanceof Error ? error.message : 'Невідома помилка'}`,
        warnings: ['Перевірте введені дані'],
        scientificReasoning: 'Розрахунок неможливий через помилку'
      };

      setState(prev => ({
        ...prev,
        calculationResult: errorResult,
        isCalculating: false
      }));
    }
  }, [state, calculationEngine, t]);

  const clearResults = useCallback(() => {
    setState(prev => ({ ...prev, calculationResult: null }));
  }, []);

  // Re-calculate when language changes if there are existing results
  useEffect(() => {
    if (previousLanguage.current !== currentLanguage && state.calculationResult) {
      // Language changed and we have existing results, re-calculate to get translated text
      calculateFertilizers();
    }
    previousLanguage.current = currentLanguage;
  }, [currentLanguage, state.calculationResult, calculateFertilizers]);

  return {
    state,
    actions: {
      updateVolume,
      updatePHInit,
      updatePHTarget,
      updateAlkalinity,
      updateTemperature,
      updateWaterHardness,
      updateFertilizerPurity,
      updateEffectTiming,
      toggleExpertMode,
      updateFertilizerAvailability,
      calculateFertilizers,
      clearResults
    }
  };
};