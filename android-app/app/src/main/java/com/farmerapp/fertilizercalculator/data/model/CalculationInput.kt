package com.farmerapp.fertilizercalculator.data.model

data class CalculationInput(
    // Required inputs
    val volumeL: Double,
    val pHInit: Double,
    val pHTarget: Double,
    val alkalinityMgLAsCaCO3: Double,
    
    // Optional inputs
    val temperatureC: Double = 25.0,
    val waterHardnessMgLAsCaCO3: Double = 100.0,
    val caIonsMgL: Double = 0.0,
    val mgIonsMgL: Double = 0.0,
    val selectedFertilizer: String = "",
    val fertilizerPurity: Double = 95.0,
    val requiredEffectTiming: EffectTiming = EffectTiming.NO_RUSH,
    val countryLocale: String = "uk",
    val budgetConstraint: Double = 0.0,
    
    val availableFertilizers: List<FertilizerAvailability>
)

data class FertilizerAvailability(
    val fertilizer: AcidicFertilizer,
    val availableAmountKg: Double,
    val isSelected: Boolean = false
)

data class CalculationResult(
    val recommendedFertilizers: List<FertilizerRecommendation>,
    val alternativeRecommendation: FertilizerRecommendation? = null,
    val totalCost: Double,
    val finalPh: Double,
    val timeToEffect: String,
    val explanation: String,
    val warnings: List<String> = emptyList(),
    val jarTestInstructions: String? = null,
    val scientificReasoning: String
)

data class FertilizerRecommendation(
    val fertilizer: AcidicFertilizer,
    val amountKg: Double,
    val amountG: Double,
    val cost: Double,
    val phContribution: Double,
    val effectType: String, // 'immediate' or 'biological'
    val timeToEffect: String,
    val sideEffects: List<String>,
    val precipitationRisk: Boolean,
    val saltLoadIncrease: Double // EC increase estimate
)

/**
 * UI State for the fertilizer calculator
 */
data class FertilizerCalculatorState(
    // Required inputs
    val volumeL: Double = 1000.0,
    val pHInit: Double = 7.0,
    val pHTarget: Double = 5.8,
    val alkalinityMgLAsCaCO3: Double = 150.0,

    // Optional inputs with defaults
    val temperatureC: Double = 25.0,
    val waterHardnessMgLAsCaCO3: Double = 100.0,
    val caIonsMgL: Double = 0.0,
    val mgIonsMgL: Double = 0.0,
    val selectedFertilizer: String = "",
    val fertilizerPurity: Double = 95.0,
    val requiredEffectTiming: EffectTiming = EffectTiming.NO_RUSH,
    val countryLocale: String = "uk",
    val budgetConstraint: Double = 0.0,

    val availableFertilizers: List<FertilizerAvailability> = emptyList(),
    val calculationResult: CalculationResult? = null,
    val isCalculating: Boolean = false,
    val showExpertMode: Boolean = false
)