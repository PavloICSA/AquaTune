export interface Fertilizer {
  id: string;
  name: string;
  formula: string;
  molarMass: number;          // g/mol
  acidityImmediate: number;   // mol H+ released immediately per mol fertilizer
  acidityBiological: number;  // mol H+ released biologically (nitrification)
  N: number;                  // % N
  P2O5: number;               // % P₂O₅
  S: number;                  // % S
  containsSulfate: boolean;
  containsPhosphate: boolean;
  pricePerKg: {
    USD?: number;
    EUR?: number;
    UAH?: number;
  };
}

export const fertilizerDB: Fertilizer[] = [
  {
    id: "map",
    name: "map", // Translation key
    formula: "NH₄H₂PO₄",
    molarMass: 115.0,
    acidityImmediate: 1.0,   // NH4+ hydrolysis
    acidityBiological: 1.0,  // nitrification of NH4+
    N: 11,
    P2O5: 52,
    S: 0,
    containsSulfate: false,
    containsPhosphate: true,
    pricePerKg: { USD: 0.7, EUR: 0.65, UAH: 28 }
  },
  {
    id: "dap",
    name: "dap", // Translation key
    formula: "(NH₄)₂HPO₄",
    molarMass: 132.0,
    acidityImmediate: 0.5,   // slightly alkaline initially
    acidityBiological: 2.0,  // nitrification of 2 NH4+
    N: 18,
    P2O5: 46,
    S: 0,
    containsSulfate: false,
    containsPhosphate: true,
    pricePerKg: { USD: 0.65, EUR: 0.61, UAH: 25 }
  },
  {
    id: "asam",
    name: "asam", // Translation key
    formula: "(NH₄)₂SO₄",
    molarMass: 132.1,
    acidityImmediate: 0.5,
    acidityBiological: 2.0,
    N: 21,
    P2O5: 0,
    S: 24,
    containsSulfate: true,
    containsPhosphate: false,
    pricePerKg: { USD: 0.4, EUR: 0.38, UAH: 15 }
  },
  {
    id: "asn",
    name: "asn", // Translation key
    formula: "NH₄NO₃ + (NH₄)₂SO₄",
    molarMass: 108.0, // effective average
    acidityImmediate: 0.5,
    acidityBiological: 1.5,
    N: 26,
    P2O5: 0,
    S: 15,
    containsSulfate: true,
    containsPhosphate: false,
    pricePerKg: { USD: 0.45, EUR: 0.42, UAH: 17 }
  },
  {
    id: "an",
    name: "an", // Translation key
    formula: "NH₄NO₃",
    molarMass: 80.0,
    acidityImmediate: 0.5,
    acidityBiological: 1.0,
    N: 34,
    P2O5: 0,
    S: 0,
    containsSulfate: false,
    containsPhosphate: false,
    pricePerKg: { USD: 0.5, EUR: 0.47, UAH: 20 }
  },
  {
    id: "npk",
    name: "npk", // Translation key
    formula: "NH₄H₂PO₄+NH₄NO₃+KCl",
    molarMass: 100.0, // approximate effective
    acidityImmediate: 0.3,
    acidityBiological: 1.0,
    N: 16,
    P2O5: 16,
    S: 5,
    containsSulfate: true,
    containsPhosphate: true,
    pricePerKg: { USD: 0.55, EUR: 0.52, UAH: 22 }
  },
  {
    id: "mgso4",
    name: "mgso4", // Translation key
    formula: "MgSO₄·7H₂O",
    molarMass: 246.47, // Epsom salt (heptahydrate) - exact value
    acidityImmediate: 0.15, // Mg²⁺ hydrolysis: ~0.15 mol H+ per mol MgSO4
    acidityBiological: 0.0, // No biological acidification for MgSO4
    N: 0,
    P2O5: 0,
    S: 13, // ~13% S in MgSO4·7H2O
    containsSulfate: true,
    containsPhosphate: false,
    pricePerKg: { USD: 0.40, EUR: 0.38, UAH: 15 }
  }
];