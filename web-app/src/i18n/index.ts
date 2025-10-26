export interface Translation {
  // App header
  appTitle: string;
  appSubtitle: string;
  appMotto: string;
  version: string;
  
  // Navigation
  calculator: string;
  whyAquaTune: string;
  about: string;
  instructions: string;
  download: string;
  
  // Form labels
  requiredParameters: string;
  volumeL: string;
  initialPH: string;
  targetPH: string;
  alkalinity: string;
  alkalinityUnit: string;
  effectTiming: string;
  expertMode: string;
  simpleMode: string;
  
  // Effect timing options
  immediate: string;
  within24h: string;
  noRush: string;
  immediateDesc: string;
  within24hDesc: string;
  noRushDesc: string;
  
  // Expert mode
  additionalParameters: string;
  temperature: string;
  waterHardness: string;
  fertilizerPurity: string;
  
  // Fertilizer selection
  availableFertilizers: string;
  selectFertilizers: string;
  
  // Buttons
  calculate: string;
  calculating: string;
  clear: string;
  
  // Results
  calculationResults: string;
  mainRecommendation: string;
  alternativeRecommendation: string;
  finalPH: string;
  totalCost: string;
  timeToEffect: string;
  
  // Warnings
  warnings: string;
  safetyMeasures: string;
  
  // Scientific
  scientificReasoning: string;
  jarTestInstructions: string;
  
  // About section
  aboutTitle: string;
  methodology: string;
  scientificBasis: string;
  
  // Instructions
  instructionsTitle: string;
  safetyProtocols: string;
  stepByStep: string;
  
  // Footer
  developedFor: string;
  iconAttribution: string;
  
  // Currency
  currency: string;
  pricePerKg: string;
  
  // Units
  gramsUnit: string;
  
  // Additional UI text
  whenNeeded: string;
  optionalParameters: string;
  recommended: string;
  forPrecipitationRisk: string;

  // About section - detailed content
  aboutDescription: string;
  carbonateSystem: string;
  nitrification: string;
  accurateCalculations: string;
  safety: string;
  scientificBase: string;
  keyFeatures: string;
  hendersonHasselbalch: string;
  hendersonDescription: string;
  carbonateSystemDetailed: string;
  nitrificationDetailed: string;
  nitrificationDescription: string;
  fertilizerCategories: string;
  ammoniumFertilizers: string;
  sulfateFertilizers: string;
  disclaimer: string;

  // About section - scientific details
  alphaFractions: string;
  bufferCapacity: string;
  temperatureCorrections: string;
  biologicalPotential: string;
  timeFrames: string;
  aerobicConditions: string;
  carbonateBuffer: string;
  nitrificationPotential: string;
  precipitationRisks: string;
  economicOptimization: string;
  onlySafeFertilizers: string;
  jarTestProtocol: string;
  riskWarnings: string;
  safetyMeasuresDetailed: string;
  peerReviewedResearch: string;
  practicalExperience: string;
  internationalStandards: string;
  continuousUpdates: string;

  // Instructions section - detailed content
  instructionsDescription: string;
  stepByStepInstructions: string;
  safetyProtocolsDetailed: string;
  jarTestProtocolDetailed: string;

  // Tab navigation
  stepByStepTab: string;
  safetyProtocolsTab: string;
  jarTestProtocolTab: string;

  // Step-by-step instructions
  enterRequiredParameters: string;
  enterRequiredParametersDesc: string;
  tankVolumeDesc: string;
  initialPHDesc: string;
  targetPHDesc: string;
  alkalinityDesc: string;
  selectEffectSpeed: string;
  selectEffectSpeedDesc: string;
  immediateEffectDesc: string;
  within24hEffectDesc: string;
  noRushEffectDesc: string;
  configureExpertParameters: string;
  configureExpertParametersDesc: string;
  temperatureDesc: string;
  waterHardnessDesc: string;
  fertilizerPurityDesc: string;
  selectAvailableFertilizers: string;
  selectAvailableFertilizersDesc: string;
  markAvailableFertilizers: string;
  specifyQuantities: string;
  systemOptimizes: string;
  getResultsAndJarTest: string;
  getResultsAndJarTestDesc: string;
  clickCalculate: string;
  performJarTest: string;
  followSafetyInstructions: string;

  // Safety protocols
  personalProtection: string;
  mandatory: string;
  forbidden: string;
  storageAndHandling: string;
  storage: string;
  transportation: string;
  disposal: string;
  emergencyProcedures: string;
  skinContact: string;
  eyeContact: string;
  protectiveGlasses: string;
  chemicalGloves: string;
  respirator: string;
  protectiveClothing: string;
  noEatingDrinking: string;
  noTouchingFace: string;
  noWorkWithoutVentilation: string;
  noMixingWithAlkalis: string;
  dryCoolPlace: string;
  separateFromAlkalis: string;
  sealedContainer: string;
  labeling: string;
  stableContainer: string;
  avoidImpacts: string;
  safetyDocuments: string;
  emergencyPlan: string;
  environmentalRequirements: string;
  noSewerage: string;
  neutralizeBeforeDisposal: string;
  consultEcologists: string;
  rinseWithWater: string;
  removeContaminatedClothing: string;
  rinse15to20Minutes: string;
  seeDoctor: string;
  rinseWithCleanWater: string;
  keepEyelidsOpen: string;
  rinseMinimum15Minutes: string;
  immediatelySeeDoctorCaps: string;

  // Jar-test protocol
  equipmentNeeded: string;
  glassJars: string;
  phMeterOrStrips: string;
  preciseScale: string;
  measuringCylinders: string;
  glassStirringRods: string;
  stopwatch: string;
  marker: string;
  logbook: string;
  stepByStepProcedure: string;
  samplePreparation: string;
  samplePreparationDesc: string;
  measureInitialPH: string;
  measureInitialPHDesc: string;
  calculateTestDoses: string;
  calculateTestDosesDesc: string;
  addFertilizers: string;
  addFertilizersDesc: string;
  mixing: string;
  mixingDesc: string;
  observation: string;
  observationDesc: string;
  measurePH: string;
  measurePHDesc: string;
  evaluateResults: string;
  evaluateResultsDesc: string;
  resultInterpretation: string;
  good: string;
  goodDesc: string;
  caution: string;
  cautionDesc: string;
  bad: string;
  badDesc: string;
  mandatoryJarTest: string;

  // Calculation results
  calculationResultsTitle: string;
  amount: string;
  effect: string;
  type: string;
  cost: string;
  biological: string;
  additionalBenefits: string;
  precipitationRisk: string;
  highSaltLoad: string;
  alternativeRecommendationColon: string;
  warningsAndSafety: string;
  jarTestInstructionsTitle: string;
  scientificReasoningTitle: string;

  // Translation error boundary
  translationError: string;
  translationErrorDescription: string;
  translationErrorOccurred: string;
  tryAgain: string;
  refresh: string;

  // Language selector
  ukrainianFlag: string;

  // Form placeholders and labels
  volumePlaceholder: string;
  initialPHPlaceholder: string;
  targetPHPlaceholder: string;
  alkalinityPlaceholder: string;
  temperaturePlaceholder: string;
  waterHardnessPlaceholder: string;
  fertilizerPurityPlaceholder: string;
  availableAmountPlaceholder: string;

  // Fertilizer item labels
  formula: string;
  price: string;
  benefits: string;
  availableAmount: string;
  availableAmountKg: string;

  // About section - additional scientific details
  hendersonHasselbalchEquation: string;
  carbonateSystemEquations: string;
  nitrificationEquations: string;
  carbonateSystemFormula: string;
  carbonateConstants: string;
  carbonateConstants2: string;
  nitrificationStep1: string;
  nitrificationStep2: string;
  nitrificationOverall: string;
  
  // Fertilizer categories - specific fertilizers
  ammoniumSulfate: string;
  ammoniumNitrate: string;
  mapFertilizer: string;
  asnFertilizer: string;
  magnesiumSulfate: string;
  potassiumSulfate: string;
  ironSulfate: string;
  mostEffective: string;
  fastActing: string;
  immediateEffectPlusP: string;
  balanced: string;
  mgPlusS: string;
  kPlusWeakAcidification: string;
  fePlusAcidification: string;

  // Fertilizer names
  fertilizerNames: {
    map: string;
    dap: string;
    asam: string;
    asn: string;
    an: string;
    npk: string;
  };

  // Safety ratings
  safetyRatings: {
    SAFE: string;
    CAUTION: string;
    RESTRICTED: string;
  };

  // Calculation engine strings
  noFertilizersSelected: string;
  addFertilizerToTank: string;
  expectedFinalPH: string;
  procedureInstructions: string;
  estimatedCost: string;
  precipitationWarning: string;
  noSuitableFertilizer: string;
  scientificBasisCarbonate: string;
  carbonateConstantsFormatted: string;
  initialConditions: string;
  requiredHPlus: string;
  selectedFertilizer: string;
  jarTestInstructionDetailed: string;
  noJarTestRequired: string;
  noAcidAdditionRequired: string;
  waterPHAlreadyTarget: string;
  highWaterHardnessPrecipitation: string;
  minutesImmediate: string;
  hours12to24: string;
  hours24to72: string;
  timeUnknown: string;
  noEffectNeeded: string;
  errorTimeToEffect: string;

  // Why AquaTune section
  whyAquaTuneTitle: string;
  whyAquaTuneContent: string;

  // Download section
  downloadTitle: string;
  downloadDescription: string;
  downloadApkButton: string;
  downloadQrTitle: string;
  downloadInstructions: string;
  downloadStep1: string;
  downloadStep2: string;
  downloadStep3: string;
  downloadStep4: string;
  downloadNote: string;
  downloadSecurity: string;
  downloadCompatibility: string;
}

export type SupportedLanguage = 'uk' | 'en' | 'es' | 'de';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  currency: CurrencyInfo;
}

export const SUPPORTED_CURRENCIES: Record<SupportedLanguage, CurrencyInfo> = {
  uk: { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  en: { code: 'USD', symbol: '$', name: 'US Dollar' },
  es: { code: 'EUR', symbol: '€', name: 'Euro' },
  de: { code: 'EUR', symbol: '€', name: 'Euro' }
};

export const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  uk: {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    flag: '🇺🇦',
    currency: SUPPORTED_CURRENCIES.uk
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    currency: SUPPORTED_CURRENCIES.en
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    currency: SUPPORTED_CURRENCIES.es
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    currency: SUPPORTED_CURRENCIES.de
  }
};

// Exchange rates (would be fetched from API in production)
export const EXCHANGE_RATES: Record<string, number> = {
  'UAH_USD': 0.027,
  'UAH_EUR': 0.025,
  'USD_UAH': 37.0,
  'USD_EUR': 0.92,
  'EUR_UAH': 40.0,
  'EUR_USD': 1.09
};