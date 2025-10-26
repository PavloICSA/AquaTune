package com.farmerapp.fertilizercalculator.data.model

/**
 * Fertilizer data model matching the web app structure
 */
data class Fertilizer(
    val id: String,
    val name: String,
    val formula: String,
    val molarMass: Double,          // g/mol
    val acidityImmediate: Double,   // mol H+ released immediately per mol fertilizer
    val acidityBiological: Double,  // mol H+ released biologically (nitrification)
    val N: Double,                  // % N
    val P2O5: Double,               // % P₂O₅
    val S: Double,                  // % S
    val containsSulfate: Boolean,
    val containsPhosphate: Boolean,
    val pricePerKg: PriceInfo
)

data class PriceInfo(
    val USD: Double? = null,
    val EUR: Double? = null,
    val UAH: Double? = null
)

enum class SafetyRating {
    SAFE,
    CAUTION,
    RESTRICTED
}

enum class EffectTiming {
    IMMEDIATE,
    WITHIN_24H,
    NO_RUSH
}

enum class FertilizerType {
    ORGANIC_ACID,
    SULFATE_FERTILIZER,
    SPECIALIZED_ACIDIFIER,
    MICRONUTRIENT,
    AMMONIUM_BASED
}

/**
 * Fertilizer database matching the web app
 */
object FertilizerDB {
    val fertilizers = listOf(
        Fertilizer(
            id = "map",
            name = "Monoammonium Phosphate (MAP)",
            formula = "NH₄H₂PO₄",
            molarMass = 115.0,
            acidityImmediate = 1.0,   // NH4+ hydrolysis
            acidityBiological = 1.0,  // nitrification of NH4+
            N = 11.0,
            P2O5 = 52.0,
            S = 0.0,
            containsSulfate = false,
            containsPhosphate = true,
            pricePerKg = PriceInfo(USD = 0.7, EUR = 0.65, UAH = 28.0)
        ),
        Fertilizer(
            id = "dap",
            name = "Diammonium Phosphate (DAP)",
            formula = "(NH₄)₂HPO₄",
            molarMass = 132.0,
            acidityImmediate = 0.5,   // slightly alkaline initially
            acidityBiological = 2.0,  // nitrification of 2 NH4+
            N = 18.0,
            P2O5 = 46.0,
            S = 0.0,
            containsSulfate = false,
            containsPhosphate = true,
            pricePerKg = PriceInfo(USD = 0.65, EUR = 0.61, UAH = 25.0)
        ),
        Fertilizer(
            id = "asam",
            name = "Ammonium Sulfate",
            formula = "(NH₄)₂SO₄",
            molarMass = 132.1,
            acidityImmediate = 0.5,
            acidityBiological = 2.0,
            N = 21.0,
            P2O5 = 0.0,
            S = 24.0,
            containsSulfate = true,
            containsPhosphate = false,
            pricePerKg = PriceInfo(USD = 0.4, EUR = 0.38, UAH = 15.0)
        ),
        Fertilizer(
            id = "asn",
            name = "Ammonium Sulfate Nitrate",
            formula = "NH₄NO₃ + (NH₄)₂SO₄",
            molarMass = 108.0, // effective average
            acidityImmediate = 0.5,
            acidityBiological = 1.5,
            N = 26.0,
            P2O5 = 0.0,
            S = 15.0,
            containsSulfate = true,
            containsPhosphate = false,
            pricePerKg = PriceInfo(USD = 0.45, EUR = 0.42, UAH = 17.0)
        ),
        Fertilizer(
            id = "an",
            name = "Ammonium Nitrate",
            formula = "NH₄NO₃",
            molarMass = 80.0,
            acidityImmediate = 0.5,
            acidityBiological = 1.0,
            N = 34.0,
            P2O5 = 0.0,
            S = 0.0,
            containsSulfate = false,
            containsPhosphate = false,
            pricePerKg = PriceInfo(USD = 0.5, EUR = 0.47, UAH = 20.0)
        ),
        Fertilizer(
            id = "npk",
            name = "NPK Complex Fertilizer",
            formula = "NH₄H₂PO₄+NH₄NO₃+KCl",
            molarMass = 100.0, // approximate effective
            acidityImmediate = 0.3,
            acidityBiological = 1.0,
            N = 16.0,
            P2O5 = 16.0,
            S = 5.0,
            containsSulfate = true,
            containsPhosphate = true,
            pricePerKg = PriceInfo(USD = 0.55, EUR = 0.52, UAH = 22.0)
        ),
        Fertilizer(
            id = "mgso4",
            name = "Magnesium Sulfate (Epsom Salt)",
            formula = "MgSO₄·7H₂O",
            molarMass = 246.47, // Epsom salt (heptahydrate) - exact value
            acidityImmediate = 0.15, // Mg²⁺ hydrolysis: ~0.15 mol H+ per mol MgSO4
            acidityBiological = 0.0, // No biological acidification for MgSO4
            N = 0.0,
            P2O5 = 0.0,
            S = 13.0, // ~13% S in MgSO4·7H2O
            containsSulfate = true,
            containsPhosphate = false,
            pricePerKg = PriceInfo(USD = 0.40, EUR = 0.38, UAH = 15.0)
        )
    )
}

/**
 * Legacy fertilizer model for compatibility
 */
data class AcidicFertilizer(
    val id: String,
    val name: String,
    val chemicalFormula: String,
    val molecularWeight: Double, // g/mol
    val acidityStrength: Double, // pH reduction per gram per liter (immediate effect)
    val nitrificationPotential: Double? = null, // mol H+ per mol fertilizer (biological effect)
    val ammoniumIons: Double? = null, // number of NH4+ ions per molecule
    val pricePerKg: Double, // Price in UAH per kg
    val availability: Boolean,
    val description: String,
    val safetyRating: SafetyRating,
    val type: FertilizerType,
    val solubility: Double, // g/L at 20°C
    val purity: Double, // fraction (0-1)
    val nutritionalBenefits: List<String>? = null, // Additional nutrients provided
    val precipitationRisk: Boolean? = null // Risk of precipitation with Ca2+/Mg2+
)

/**
 * Helper to convert new fertilizer format to legacy format
 */
fun Fertilizer.toLegacyFormat(): AcidicFertilizer {
    val safetyRating = when {
        id == "an" -> SafetyRating.RESTRICTED
        N > 30 -> SafetyRating.CAUTION
        containsPhosphate -> SafetyRating.CAUTION
        id == "npk" -> SafetyRating.CAUTION
        else -> SafetyRating.SAFE
    }
    
    return AcidicFertilizer(
        id = id,
        name = name,
        chemicalFormula = formula,
        molecularWeight = molarMass,
        acidityStrength = acidityImmediate * 0.01, // Convert to approximate pH reduction per g/L
        nitrificationPotential = acidityBiological,
        ammoniumIons = if (N > 0) 1.0 else 0.0, // Simplified estimation
        pricePerKg = pricePerKg.UAH ?: 30.0, // Default to UAH price or fallback
        availability = true,
        description = "N: ${N}%, P₂O₅: ${P2O5}%, S: ${S}%",
        safetyRating = safetyRating,
        type = if (N > 0) FertilizerType.AMMONIUM_BASED else FertilizerType.SULFATE_FERTILIZER,
        solubility = 400.0, // Default solubility
        purity = 0.95,
        nutritionalBenefits = listOfNotNull(
            if (N > 0) "${N}% N" else null,
            if (P2O5 > 0) "${P2O5}% P₂O₅" else null,
            if (S > 0) "${S}% S" else null
        ),
        precipitationRisk = containsPhosphate || containsSulfate
    )
}