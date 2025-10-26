package com.farmerapp.fertilizercalculator.domain

import com.farmerapp.fertilizercalculator.data.localization.Translations
import com.farmerapp.fertilizercalculator.data.model.*

/**
 * Utility class for generating localized calculation results
 */
object LocalizedCalculationUtils {
    
    fun generateLocalizedWarnings(
        recommendations: List<FertilizerRecommendation>,
        translations: Translations
    ): List<String> {
        val warns = mutableListOf<String>()
        try {
            for (rec in recommendations) {
                if (rec.saltLoadIncrease > 2.0) {
                    warns.add(String.format(
                        translations.highSaltLoadWarning,
                        translations.getFertilizerName(rec.fertilizer.id),
                        rec.saltLoadIncrease
                    ))
                }
                if (rec.effectType == "immediate" && rec.amountKg > 10) {
                    warns.add(String.format(
                        translations.largeMassWarning,
                        rec.amountKg,
                        translations.getFertilizerName(rec.fertilizer.id)
                    ))
                }
                if (rec.fertilizer.safetyRating == SafetyRating.CAUTION) {
                    warns.add(translations.mapWarningMessage)
                }
                if (rec.fertilizer.id == "an") {
                    warns.add(translations.ammoniumNitrateRegulationWarning)
                }
            }
        } catch (e: Exception) {
            // Fallback to English if formatting fails
            warns.add("Warning generation failed: ${e.message}")
        }
        return warns
    }
    
    fun generateLocalizedJarTestInstructions(
        recs: List<FertilizerRecommendation>,
        translations: Translations
    ): String {
        if (recs.isEmpty()) return ""
        return try {
            val main = recs[0]
            val testDose_g = main.amountG * 0.4
            val per1L = testDose_g / 1.0
            
            String.format(
                translations.jarTestDetailedInstructions,
                per1L,
                translations.getFertilizerName(main.fertilizer.id)
            )
        } catch (e: Exception) {
            "JAR-TEST: Take 1 L sample and test with calculated fertilizer amount."
        }
    }
    
    fun generateLocalizedDetailedExplanation(
        result: CalculationResult,
        translations: Translations
    ): String {
        if (result.recommendedFertilizers.isEmpty()) return result.explanation
        val main = result.recommendedFertilizers[0]
        
        // For now, return the original explanation since it's complex to reconstruct
        // In a full implementation, you'd reconstruct this with proper localization
        return result.explanation
    }
}