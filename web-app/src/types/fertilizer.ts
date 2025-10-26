export enum SafetyRating {
  SAFE = 'SAFE',
  CAUTION = 'CAUTION',
  RESTRICTED = 'RESTRICTED'
}

export enum EffectTiming {
  IMMEDIATE = 'IMMEDIATE',
  WITHIN_24H = 'WITHIN_24H', 
  NO_RUSH = 'NO_RUSH'
}

export enum FertilizerType {
  ORGANIC_ACID = 'ORGANIC_ACID',
  SULFATE_FERTILIZER = 'SULFATE_FERTILIZER',
  SPECIALIZED_ACIDIFIER = 'SPECIALIZED_ACIDIFIER',
  MICRONUTRIENT = 'MICRONUTRIENT',
  AMMONIUM_BASED = 'AMMONIUM_BASED'
}

export interface AcidicFertilizer {
  id: string;
  name: string;
  chemicalFormula: string;
  molecularWeight: number; // g/mol
  acidityStrength: number; // pH reduction per gram per liter (immediate effect)
  nitrificationPotential?: number; // mol H+ per mol fertilizer (biological effect)
  ammoniumIons?: number; // number of NH4+ ions per molecule
  pricePerKg: number; // Price in UAH per kg
  availability: boolean;
  description: string;
  safetyRating: SafetyRating;
  type: FertilizerType;
  solubility: number; // g/L at 20°C
  purity: number; // fraction (0-1)
  nutritionalBenefits?: string[]; // Additional nutrients provided
  precipitationRisk?: boolean; // Risk of precipitation with Ca2+/Mg2+
}

export interface FertilizerAvailability {
  fertilizer: AcidicFertilizer;
  availableAmountKg: number;
  isSelected: boolean;
}

export interface FertilizerRecommendation {
  fertilizer: AcidicFertilizer;
  amountKg: number;
  amountG: number;
  cost: number;
  phContribution: number;
  effectType: 'immediate' | 'biological';
  timeToEffect: string;
  sideEffects: string[];
  precipitationRisk: boolean;
  saltLoadIncrease: number; // EC increase estimate
}

export interface CalculationInput {
  // ABSOLUTELY required inputs
  volumeL: number;
  pHInit: number;
  pHTarget: number;
  alkalinityMgLAsCaCO3: number;
  
  // Optional but recommended inputs
  temperatureC?: number;
  waterHardnessMgLAsCaCO3?: number;
  caIonsMgL?: number;
  mgIonsMgL?: number;
  selectedFertilizer?: string; // fertilizer ID
  fertilizerPurity?: number; // 0-1
  requiredEffectTiming: EffectTiming;
  countryLocale?: string;
  budgetConstraint?: number;
  
  availableFertilizers: FertilizerAvailability[];
}

export interface CalculationResult {
  recommendedFertilizers: FertilizerRecommendation[];
  alternativeRecommendation?: FertilizerRecommendation;
  totalCost: number;
  finalPh: number;
  timeToEffect: string;
  explanation: string;
  warnings: string[];
  jarTestInstructions?: string;
  scientificReasoning: string;
}

export interface FertilizerCalculatorState {
  // Required inputs
  volumeL: number | string; // Allow string for editing
  pHInit: number | string; // Allow string for editing
  pHTarget: number | string; // Allow string for editing
  alkalinityMgLAsCaCO3: number | string; // Allow string for editing
  
  // Optional inputs
  temperatureC: number;
  waterHardnessMgLAsCaCO3: number;
  caIonsMgL: number;
  mgIonsMgL: number;
  selectedFertilizer: string;
  fertilizerPurity: number | string; // Allow string for editing
  requiredEffectTiming: EffectTiming;
  countryLocale: string;
  budgetConstraint: number;
  
  availableFertilizers: FertilizerAvailability[];
  calculationResult: CalculationResult | null;
  isCalculating: boolean;
  showExpertMode: boolean;
}