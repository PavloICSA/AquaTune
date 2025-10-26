package com.farmerapp.fertilizercalculator.data.localization

import android.content.Context
import android.content.SharedPreferences
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class LocalizationManager @Inject constructor(
    private val context: Context
) {
    private val prefs: SharedPreferences = context.getSharedPreferences("localization", Context.MODE_PRIVATE)
    
    private val _currentLanguage = MutableStateFlow(getCurrentLanguage())
    val currentLanguage: StateFlow<Language> = _currentLanguage.asStateFlow()
    
    private val _translations = MutableStateFlow(getTranslationsForLanguage(_currentLanguage.value))
    val translations: StateFlow<Translations> = _translations.asStateFlow()
    
    private fun getCurrentLanguage(): Language {
        val savedLanguage = prefs.getString("language", null)
        return savedLanguage?.let { Language.valueOf(it) } ?: Language.UKRAINIAN
    }
    
    fun setLanguage(language: Language) {
        prefs.edit().putString("language", language.name).apply()
        _currentLanguage.value = language
        _translations.value = getTranslationsForLanguage(language)
    }
    
    private fun getTranslationsForLanguage(language: Language): Translations {
        return when (language) {
            Language.UKRAINIAN -> UkrainianTranslations()
            Language.ENGLISH -> EnglishTranslations()
            Language.SPANISH -> SpanishTranslations()
            Language.GERMAN -> GermanTranslations()
        }
    }
}

enum class Language(val displayName: String, val flag: String) {
    UKRAINIAN("Українська", "🇺🇦"),
    ENGLISH("English", "🇺🇸"),
    SPANISH("Español", "🇪🇸"),
    GERMAN("Deutsch", "🇩🇪")
}

@Composable
fun useTranslation(localizationManager: LocalizationManager): Translations {
    val translations by localizationManager.translations.collectAsState()
    return translations
}