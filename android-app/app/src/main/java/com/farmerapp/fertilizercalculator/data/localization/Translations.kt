package com.farmerapp.fertilizercalculator.data.localization

interface Translations {
    // App header
    val appTitle: String
    val appSubtitle: String
    val appMotto: String
    val version: String

    // Navigation
    val calculator: String
    val whyAquaTune: String
    val about: String
    val instructions: String
    val download: String

    // Form labels
    val requiredParameters: String
    val volumeL: String
    val initialPH: String
    val targetPH: String
    val alkalinity: String
    val alkalinityUnit: String
    val effectTiming: String
    val expertMode: String
    val simpleMode: String

    // Effect timing options
    val immediate: String
    val within24h: String
    val noRush: String
    val immediateDesc: String
    val within24hDesc: String
    val noRushDesc: String

    // Expert mode
    val additionalParameters: String
    val temperature: String
    val waterHardness: String
    val fertilizerPurity: String

    // Fertilizer selection
    val availableFertilizers: String
    val selectFertilizers: String

    // Buttons
    val calculate: String
    val calculating: String
    val clear: String

    // Results
    val calculationResults: String
    val mainRecommendation: String
    val alternativeRecommendation: String
    val finalPH: String
    val totalCost: String
    val timeToEffect: String

    // Warnings
    val warnings: String
    val safetyMeasures: String

    // Scientific
    val scientificReasoning: String
    val jarTestInstructions: String

    // About section
    val aboutTitle: String
    val methodology: String
    val scientificBasis: String

    // Instructions
    val instructionsTitle: String
    val safetyProtocols: String
    val stepByStep: String

    // Footer
    val developedFor: String
    val iconAttribution: String

    // Currency
    val currency: String
    val pricePerKg: String

    // Units
    val gramsUnit: String

    // Additional UI text
    val whenNeeded: String
    val optionalParameters: String
    val recommended: String
    val forPrecipitationRisk: String

    // About section - detailed content
    val aboutDescription: String
    val carbonateSystem: String
    val nitrification: String
    val accurateCalculations: String
    val safety: String
    val scientificBase: String
    val keyFeatures: String
    val hendersonHasselbalch: String
    val hendersonDescription: String
    val carbonateSystemDetailed: String
    val nitrificationDetailed: String
    val nitrificationDescription: String
    val fertilizerCategories: String
    val ammoniumFertilizers: String
    val sulfateFertilizers: String
    val disclaimer: String

    // Why AquaTune section
    val whyAquaTuneTitle: String
    val whyAquaTuneContent: String

    // Download section
    val downloadTitle: String
    val downloadDescription: String
    val downloadApkButton: String
    val downloadQrTitle: String
    val downloadInstructions: String
    val downloadStep1: String
    val downloadStep2: String
    val downloadStep3: String
    val downloadStep4: String
    val downloadNote: String
    val downloadSecurity: String
    val downloadCompatibility: String

    // Form placeholders and labels
    val volumePlaceholder: String
    val initialPHPlaceholder: String
    val targetPHPlaceholder: String
    val alkalinityPlaceholder: String
    val temperaturePlaceholder: String
    val waterHardnessPlaceholder: String
    val fertilizerPurityPlaceholder: String
    val availableAmountPlaceholder: String

    // Fertilizer item labels
    val formula: String
    val price: String
    val benefits: String
    val availableAmount: String
    val availableAmountKg: String

    // Additional hardcoded text that needs translation
    val carbonateSystemDescription: String
    val alphaFractionsCalculation: String
    val alphaFractionsDescription: String
    val temperatureCorrections: String
    val temperatureCorrectionDescription: String
    val biologicalHPotential: String
    val biologicalHPotentialDescription: String
    val economicOptimization: String
    val economicOptimizationDescription: String
    val ammoniumFertilizerExamples: String
    val ammoniumFertilizerDescription: String
    val sulfateFertilizerExamples: String
    val sulfateFertilizerDescription: String
    val examplesPrefix: String
    val accurateCalculationsDescription: String
    val scientificBaseDescription: String
    val safetyDescription: String
    
    // Tab titles
    val stepByStepTab: String
    val safetyTab: String
    val jarTestTab: String
    
    // Step-by-step instructions
    val enterRequiredParametersTitle: String
    val enterRequiredParametersDescription: String
    val tankVolumeDetail: String
    val waterPHDetail: String
    val desiredPHDetail: String
    val alkalinityDetail: String
    val selectEffectSpeedTitle: String
    val selectEffectSpeedDescription: String
    val immediateEffectDetail: String
    val within24hEffectDetail: String
    val noRushEffectDetail: String
    val configureExpertParametersTitle: String
    val configureExpertParametersDescription: String
    val temperatureDetail: String
    val fertilizerPurityDetail: String
    val selectAvailableFertilizersTitle: String
    val selectAvailableFertilizersDescription: String
    val markAvailableFertilizersDetail: String
    val specifyQuantitiesDetail: String
    val systemOptimizesDetail: String
    val getResultsAndJarTestTitle: String
    val getResultsAndJarTestDescription: String
    val clickCalculateDetail: String
    val performJarTestDetail: String
    val followSafetyDetail: String
    
    // Safety protocols
    val personalProtectionTitle: String
    val personalProtectionMandatory: String
    val personalProtectionForbidden: String
    val storageAndHandlingTitle: String
    val storageAndHandlingStorage: String
    val storageAndHandlingTransport: String
    val storageAndHandlingDisposal: String
    val emergencyProceduresTitle: String
    val emergencyProceduresSkin: String
    val emergencyProceduresEyes: String
    
    // Jar test equipment
    val equipmentNeededTitle: String
    val glassJarsEquipment: String
    val phMeterEquipment: String
    val preciseScaleEquipment: String
    val measuringCylindersEquipment: String
    val glassStirringRodsEquipment: String
    val stopwatchEquipment: String
    val markerEquipment: String
    val logbookEquipment: String
    
    // Jar test steps
    val samplePreparationTitle: String
    
    // Calculator results section
    val amount: String
    val cost: String
    val warningsAndSafetyMeasures: String
    val jarTestInstructionsTitle: String
    val scientificReasoningTitle: String
    val calculationResultsTitle: String
    val mainRecommendationTitle: String
    
    // Result interpretation
    val resultInterpretation: String
    val good: String
    val goodDescription: String
    val caution: String
    val cautionDescription: String
    val bad: String
    val badDescription: String
    val important: String
    val mandatoryJarTest: String
    
    // Jar test procedure steps
    val stepByStepProcedure: String
    val measureInitialPH: String
    val measureInitialPHDescription: String
    val calculateTestDoses: String
    val calculateTestDosesDescription: String
    val addFertilizers: String
    val addFertilizersDescription: String
    val mixing: String
    val mixingDescription: String
    
    // Fertilizer names (localized)
    val mapFertilizerName: String
    val dapFertilizerName: String
    val ammoniumSulfateName: String
    val ammoniumSulfateNitrateName: String
    val ammoniumNitrateName: String
    val npkComplexFertilizerName: String
    val magnesiumSulfateName: String
    
    // Warning messages
    val mapWarningMessage: String
    val jarTestDetailedInstructions: String
    val scientificReasoningDetailed: String
    
    // Additional missing translations
    val samplePreparationDescription: String
    val importantWarning: String
    val observation: String
    val observationDescription: String
    val phMeasurement: String
    val phMeasurementDescription: String
    val resultEvaluation: String
    val resultEvaluationDescription: String
    
    // Function to get localized fertilizer name
    fun getFertilizerName(fertilizerId: String): String {
        return when (fertilizerId) {
            "map" -> mapFertilizerName
            "dap" -> dapFertilizerName
            "asam" -> ammoniumSulfateName
            "asn" -> ammoniumSulfateNitrateName
            "an" -> ammoniumNitrateName
            "npk" -> npkComplexFertilizerName
            "mgso4" -> magnesiumSulfateName
            else -> "Unknown Fertilizer"
        }
    }
    
    // Localized warning messages
    val highSaltLoadWarning: String
    val largeMassWarning: String
    val ammoniumNitrateRegulationWarning: String
    
    // Error messages
    val calculationError: String
    val checkInputData: String
    val calculationImpossible: String
}