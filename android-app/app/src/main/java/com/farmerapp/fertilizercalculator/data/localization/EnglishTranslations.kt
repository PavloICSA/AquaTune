package com.farmerapp.fertilizercalculator.data.localization

class EnglishTranslations : Translations {
    // App header
    override val appTitle = "AquaTune"
    override val appSubtitle = "Spray tank acidification calculations based on carbonate system and nitrification"
    override val appMotto = "Fine-tuning water chemistry for smarter spraying"
    override val version = "Version 2.0 - Scientific"

    // Navigation
    override val calculator = "Calculator"
    override val whyAquaTune = "Why AquaTune?"
    override val about = "About"
    override val instructions = "Instructions"
    override val download = "Download"

    // Form labels
    override val requiredParameters = "Required Parameters"
    override val volumeL = "Tank Volume (L)"
    override val initialPH = "Initial pH"
    override val targetPH = "Target pH"
    override val alkalinity = "Alkalinity"
    override val alkalinityUnit = "mg/L as CaCO₃"
    override val effectTiming = "Effect Timing"
    override val expertMode = "Expert Mode"
    override val simpleMode = "Simple Mode"

    // Effect timing options
    override val immediate = "Immediate"
    override val within24h = "Within 24h"
    override val noRush = "No Rush"
    override val immediateDesc = "During spraying (minutes)"
    override val within24hDesc = "12-24 hours"
    override val noRushDesc = "24-72 hours (nitrification)"

    // Expert mode
    override val additionalParameters = "Additional Parameters (Expert Mode)"
    override val temperature = "Temperature (°C)"
    override val waterHardness = "Water Hardness (mg/L CaCO₃)"
    override val fertilizerPurity = "Fertilizer Purity (%)"

    // Fertilizer selection
    override val availableFertilizers = "Available Acidic Fertilizers"
    override val selectFertilizers = "Select fertilizers and specify quantities"

    // Buttons
    override val calculate = "Calculate"
    override val calculating = "Calculating..."
    override val clear = "Clear"

    // Results
    override val calculationResults = "Scientific Calculation Results"
    override val mainRecommendation = "Main Recommendation"
    override val alternativeRecommendation = "Alternative Recommendation"
    override val finalPH = "Final pH"
    override val totalCost = "Total Cost"
    override val timeToEffect = "Time to Effect"

    // Warnings
    override val warnings = "Warnings and Safety Measures"
    override val safetyMeasures = "Safety Measures"

    // Scientific
    override val scientificReasoning = "Scientific Reasoning"
    override val jarTestInstructions = "Jar-Test Instructions"

    // About section
    override val aboutTitle = "About Scientific Calculator"
    override val methodology = "Methodology"
    override val scientificBasis = "Scientific Basis"

    // Instructions
    override val instructionsTitle = "Usage Instructions"
    override val safetyProtocols = "Safety Protocols"
    override val stepByStep = "Step-by-Step Guide"

    // Footer
    override val developedFor = "Developed for farmers with care for efficiency and agricultural safety"
    override val iconAttribution = "Sprayer icons created by Ndut_Design - Flaticon"

    // Currency
    override val currency = "$"
    override val pricePerKg = "$/kg"

    // Units
    override val gramsUnit = "g"

    // Additional UI text
    override val whenNeeded = "When do you need the acidification effect?"
    override val optionalParameters = "Optional parameters for improved calculation accuracy"
    override val recommended = "Recommended: 5.5-6.0"
    override val forPrecipitationRisk = "For precipitation risk assessment"

    // About section - detailed content
    override val aboutDescription = "Comprehensive scientific tool for calculating spray tank acidification based on modern knowledge of carbonate system and nitrification processes."
    override val carbonateSystem = "Carbonate System"
    override val nitrification = "Nitrification"
    override val accurateCalculations = "Accurate Calculations"
    override val safety = "Safety"
    override val scientificBase = "Scientific Base"
    override val keyFeatures = "Key Features"
    override val hendersonHasselbalch = "Henderson-Hasselbalch Equation"
    override val hendersonDescription = "Fundamental equation for calculating pH of buffer systems, adapted for water carbonate system."
    override val carbonateSystemDetailed = "Carbonate System"
    override val nitrificationDetailed = "Nitrification"
    override val nitrificationDescription = "Biological process of ammonium oxidation that generates acidity over 24-72 hours under aerobic conditions."
    override val fertilizerCategories = "Fertilizer Categories"
    override val ammoniumFertilizers = "Ammonium Fertilizers (primary)"
    override val sulfateFertilizers = "Sulfate Fertilizers (auxiliary)"
    override val disclaimer = "Important: This calculator is intended for educational and advisory purposes. Always perform jar-test before production application. Consult agronomists regarding specific conditions of your farm."

    // Why AquaTune section
    override val whyAquaTuneTitle = "Why We Need AquaTune"
    override val whyAquaTuneContent = "Maintaining the correct pH of spray water is a critical yet often overlooked factor in the effectiveness of crop protection treatments and foliar fertilization. The chemical stability, solubility, and absorption rate of most agrochemicals depend strongly on water pH. Under alkaline conditions, many active ingredients—especially organophosphates, carbamates, and certain micronutrients—undergo rapid hydrolytic degradation, significantly reducing their biological efficacy before reaching the target surface. Conversely, overly acidic solutions can cause phytotoxic effects or promote corrosion of sprayer components.\n\nIn most agricultural regions, irrigation and spray water are moderately to strongly alkaline due to the presence of bicarbonates, carbonates, and dissolved salts of calcium and magnesium. These compounds also increase water hardness, enhancing precipitation risks when fertilizers and pesticides are mixed. Achieving an optimal pH range (typically 5.5–6.5) is therefore essential to ensure chemical stability, efficient absorption, and safe application.\n\nAquaTune provides a science-based solution for this challenge. By integrating chemical equilibrium modeling, fertilizer hydrolysis data, and real-time pH calculations, it allows users to determine the exact quantity and type of acidic fertilizer needed to adjust spray water to the ideal range—without resorting to strong mineral acids that may harm crops or ecosystems. The result is better pesticide performance, fewer losses, lower environmental risks, and more predictable field outcomes."

    // Download section
    override val downloadTitle = "Download Mobile App"
    override val downloadDescription = "Get AquaTune for Android smartphones to use offline in the field"
    override val downloadApkButton = "Download APK File"
    override val downloadQrTitle = "Scan QR Code to Download"
    override val downloadInstructions = "Installation Instructions"
    override val downloadStep1 = "1. Download the APK file to your Android device"
    override val downloadStep2 = "2. Enable \"Install from unknown sources\" in your device settings"
    override val downloadStep3 = "3. Open the downloaded APK file and follow installation prompts"
    override val downloadStep4 = "4. Launch AquaTune and start calculating offline"
    override val downloadNote = "Note: This app works completely offline - no internet connection required after installation"
    override val downloadSecurity = "Security: Enable installation from unknown sources only temporarily and disable it after installation"
    override val downloadCompatibility = "Compatible with Android 5.0 and higher"

    // Form placeholders and labels
    override val volumePlaceholder = "1000"
    override val initialPHPlaceholder = "8.0"
    override val targetPHPlaceholder = "5.8"
    override val alkalinityPlaceholder = "150"
    override val temperaturePlaceholder = "25"
    override val waterHardnessPlaceholder = "100"
    override val fertilizerPurityPlaceholder = "95"
    override val availableAmountPlaceholder = "0.0"

    // Fertilizer item labels
    override val formula = "Formula:"
    override val price = "Price:"
    override val benefits = "Benefits:"
    override val availableAmount = "Available Amount (kg)"
    override val availableAmountKg = "kg"

    // Additional hardcoded text that needs translation
    override val carbonateSystemDescription = "Carbonate equilibrium system in water"
    override val alphaFractionsCalculation = "DIC α-fractions calculation"
    override val alphaFractionsDescription = "Precise determination of carbonate forms distribution"
    override val temperatureCorrections = "Temperature corrections"
    override val temperatureCorrectionDescription = "Equilibrium constants correction by temperature"
    override val biologicalHPotential = "Biological H⁺ potential"
    override val biologicalHPotentialDescription = "Accounting for nitrification processes"
    override val economicOptimization = "Economic optimization"
    override val economicOptimizationDescription = "Cost minimization while achieving the goal"
    override val ammoniumFertilizerExamples = "MAP, DAP, Ammonium Sulfate"
    override val ammoniumFertilizerDescription = "Primary acidifiers with nitrification potential"
    override val sulfateFertilizerExamples = "Magnesium Sulfate, Potassium Sulfate"
    override val sulfateFertilizerDescription = "Auxiliary acidifiers with additional nutrients"
    override val examplesPrefix = "Examples:"
    override val accurateCalculationsDescription = "Accurate calculations based on carbonate system"
    override val scientificBaseDescription = "Scientific justification for each recommendation"
    override val safetyDescription = "Safe recommendations with warnings"
    
    // Tab titles
    override val stepByStepTab = "Step-by-Step Guide"
    override val safetyTab = "Safety"
    override val jarTestTab = "Jar-Test"
    
    // Step-by-step instructions
    override val enterRequiredParametersTitle = "Enter Required Parameters"
    override val enterRequiredParametersDescription = "Enter basic parameters for calculation"
    override val tankVolumeDetail = "Spray tank volume"
    override val waterPHDetail = "Water pH before treatment (measure with pH meter)"
    override val desiredPHDetail = "Desired pH (recommended 5.5-6.0)"
    override val alkalinityDetail = "Water alkalinity (mg/L as CaCO₃)"
    override val selectEffectSpeedTitle = "Select Effect Speed"
    override val selectEffectSpeedDescription = "Choose when you need acidification effect"
    override val immediateEffectDetail = "Immediate - effect during spraying"
    override val within24hEffectDetail = "Within 24h - effect in 12-24 hours"
    override val noRushEffectDetail = "No rush - biological effect 24-72 hours"
    override val configureExpertParametersTitle = "Configure Expert Parameters (optional)"
    override val configureExpertParametersDescription = "Additional parameters for improved accuracy"
    override val temperatureDetail = "Temperature - affects carbonate system constants"
    override val fertilizerPurityDetail = "Fertilizer purity - if different from standard"
    override val selectAvailableFertilizersTitle = "Select Available Fertilizers"
    override val selectAvailableFertilizersDescription = "Specify which fertilizers you have"
    override val markAvailableFertilizersDetail = "Mark fertilizers you have available"
    override val specifyQuantitiesDetail = "Specify available quantity of each fertilizer"
    override val systemOptimizesDetail = "System automatically optimizes selection by price and efficiency"
    override val getResultsAndJarTestTitle = "Get Results and Perform Jar-Test"
    override val getResultsAndJarTestDescription = "Get recommendations and verify them"
    override val clickCalculateDetail = "Click \"Calculate\" to get recommendations"
    override val performJarTestDetail = "Mandatory jar-test before scaling up"
    override val followSafetyDetail = "Follow safety instructions"
    
    // Safety protocols
    override val personalProtectionTitle = "Personal Protection"
    override val personalProtectionMandatory = "Mandatory: Protective glasses, chemical-resistant gloves, respirator when working with dust, protective clothing"
    override val personalProtectionForbidden = "Forbidden: Eating, drinking during work, touching face with hands, working without ventilation, mixing with alkalis"
    override val storageAndHandlingTitle = "Storage and Handling"
    override val storageAndHandlingStorage = "Storage: Dry, cool place, separate from alkalis, sealed container, labeling"
    override val storageAndHandlingTransport = "Transportation: Stable container, avoid impacts, safety documents, emergency plan"
    override val storageAndHandlingDisposal = "Disposal: According to environmental requirements, do not drain into sewerage, neutralize before disposal"
    override val emergencyProceduresTitle = "Emergency Procedures"
    override val emergencyProceduresSkin = "Skin contact: Immediately rinse with large amount of water, remove contaminated clothing, rinse for 15-20 minutes"
    override val emergencyProceduresEyes = "Eye contact: Immediately rinse with clean water, keep eyelids open, rinse for minimum 15 minutes, IMMEDIATELY see doctor"
    
    // Jar test equipment
    override val equipmentNeededTitle = "Equipment Needed"
    override val glassJarsEquipment = "Glass jars 1 L (minimum 3 pcs)"
    override val phMeterEquipment = "pH meter or test strips"
    override val preciseScaleEquipment = "Precise scale (0.1 g)"
    override val measuringCylindersEquipment = "Measuring cylinders"
    override val glassStirringRodsEquipment = "Glass stirring rods"
    override val stopwatchEquipment = "Stopwatch"
    override val markerEquipment = "Marker for labeling"
    override val logbookEquipment = "Logbook"
    
    // Jar test steps
    override val samplePreparationTitle = "Sample Preparation"
    
    // Calculator results section
    override val amount = "Amount:"
    override val cost = "Cost:"
    override val warningsAndSafetyMeasures = "Warnings and Safety Measures:"
    override val jarTestInstructionsTitle = "Jar-Test Instructions:"
    override val scientificReasoningTitle = "Scientific Reasoning:"
    override val calculationResultsTitle = "Scientific Calculation Results"
    override val mainRecommendationTitle = "Main Recommendation:"
    
    // Result interpretation
    override val resultInterpretation = "Result Interpretation"
    override val good = "Good"
    override val goodDescription = "Clear solution, pH in target range, no precipitation"
    override val caution = "Caution"
    override val cautionDescription = "Slight turbidity, pH slightly out of range"
    override val bad = "Bad"
    override val badDescription = "Precipitation, strong turbidity, pH far from target"
    override val important = "IMPORTANT"
    override val mandatoryJarTest = "MANDATORY jar-test before scaling up to full tank!"
    
    // Jar test procedure steps
    override val stepByStepProcedure = "Step-by-Step Procedure"
    override val measureInitialPH = "Measure Initial pH"
    override val measureInitialPHDescription = "Measure and record initial pH in all three jars. Also measure water temperature."
    override val calculateTestDoses = "Calculate Test Doses"
    override val calculateTestDosesDescription = "Use recommended dose from calculator. For 1 L test: dose (g/L) = recommended dose (kg) / tank volume (thousand L)."
    override val addFertilizers = "Add Fertilizers"
    override val addFertilizersDescription = "In '50% dose' jar add half of calculated amount. In '100% dose' jar - full amount. Leave control jar unchanged."
    override val mixing = "Mixing"
    override val mixingDescription = "Stir each jar with glass rod for 2-3 minutes. Stir vigorously but carefully."
    
    // Fertilizer names (localized)
    override val mapFertilizerName = "Monoammonium Phosphate (MAP)"
    override val dapFertilizerName = "Diammonium Phosphate (DAP)"
    override val ammoniumSulfateName = "Ammonium Sulfate"
    override val ammoniumSulfateNitrateName = "Ammonium Sulfate Nitrate"
    override val ammoniumNitrateName = "Ammonium Nitrate"
    override val npkComplexFertilizerName = "NPK Complex Fertilizer"
    override val magnesiumSulfateName = "Magnesium Sulfate (Epsom Salt)"
    
    // Warning messages
    override val mapWarningMessage = "Monoammonium Phosphate (MAP): use with caution."
    override val jarTestDetailedInstructions = "JAR-TEST: Take 1 L sample. Add %.2f g (40%% of calculated dose scaled to 1 L) %s. Stir 2-3 min, wait 30-60 min. Check for precipitate and measure pH."
    override val scientificReasoningDetailed = "Add 252.4 g Monoammonium Phosphate (MAP) to 1000.0 L tank.\nExpected final pH: 5.80\nProcedure: add ~1/3 of dose, mix, measure pH; then add remainder slowly while stirring until target reached.\nEstimated cost: 7.07 $\nWarning: precipitation risk flagged - perform jar-test."
    
    // Additional missing translations
    override val samplePreparationDescription = "Take 3 jars of 1 L each. Fill them with water from the same source that will be used in the tank. Label jars as 'Control', '50% dose', '100% dose'."
    override val importantWarning = "⚠️ Important Warning"
    override val observation = "Observation"
    override val observationDescription = "Leave jars for 30-60 minutes. Check every 15 minutes for precipitate, cloudiness, or color changes."
    override val phMeasurement = "pH Measurement"
    override val phMeasurementDescription = "After 30 minutes, measure pH in all jars. Record results. Repeat after 60 minutes if necessary."
    override val resultEvaluation = "Result Evaluation"
    override val resultEvaluationDescription = "Compare results. If there is precipitate or heavy cloudiness - reduce dose or change fertilizer."
    
    // Localized warning messages
    override val highSaltLoadWarning = "High salt load from %s (~+%.2f mS/cm) - phytotoxicity risk."
    override val largeMassWarning = "Large mass (%.2f kg) %s - consider alternatives."
    override val ammoniumNitrateRegulationWarning = "Ammonium nitrate may be regulated in some jurisdictions."
    
    // Error messages
    override val calculationError = "Calculation error"
    override val checkInputData = "Check input data"
    override val calculationImpossible = "Calculation impossible due to error"
}