import { useCallback, useMemo } from 'react';
import { useTranslationContext } from '../contexts/TranslationContext';
import { SupportedLanguage, Translation, CurrencyInfo, LANGUAGE_CONFIGS } from '../i18n';

// Return type for the useTranslation hook
export interface UseTranslationReturn {
  // Translation data
  t: Translation;
  currentLanguage: SupportedLanguage;
  currency: CurrencyInfo;
  availableLanguages: SupportedLanguage[];
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  changeLanguage: (lang: SupportedLanguage) => void;
  convertPrice: (priceUAH: number) => number;
  formatPrice: (priceUAH: number) => string;
  
  // Enhanced utilities
  getLanguageConfig: (lang?: SupportedLanguage) => typeof LANGUAGE_CONFIGS[SupportedLanguage];
  isLanguageSupported: (lang: string) => lang is SupportedLanguage;
  formatCurrency: (amount: number, currencyCode?: string) => string;
  
  // Type-safe translation function with fallback
  translate: <K extends keyof Translation>(key: K, fallback?: string) => Translation[K];
}

/**
 * Unified translation hook that provides access to all translation functionality.
 * This hook replaces the existing useI18n and useI18nSimple hooks.
 * 
 * Features:
 * - Type-safe translation function with fallback mechanisms
 * - Immediate language switching with re-render triggers
 * - Currency conversion and formatting utilities
 * - Error handling with graceful fallbacks
 * - Loading states and error reporting
 * - Enhanced utility functions for language management
 * 
 * Requirements addressed:
 * - 3.1: Single, unified i18n hook across all components
 * - 3.2: Consistent translation key naming conventions
 * - 3.3: Immediate access to all translation functions
 * - 3.4: Triggers re-renders when translation state changes
 * - 4.4: Currency conversion using appropriate exchange rates
 * - 4.5: Correct currency format for selected language
 * 
 * @returns Translation context with all necessary functions and state
 */
export const useTranslation = (): UseTranslationReturn => {
  const context = useTranslationContext();
  
  // Type-safe translation function with fallback mechanism
  const translate = useCallback(<K extends keyof Translation>(
    key: K, 
    fallback?: string
  ): Translation[K] => {
    try {
      // Get translation from current language
      const translation = context.t[key];
      
      // Return translation if it exists and is not empty
      if (translation && typeof translation === 'string' && translation.trim() !== '') {
        return translation;
      }
      
      // Fallback to Ukrainian if current language translation is missing
      if (context.currentLanguage !== 'uk') {
        const ukrainianTranslation = context.translations['uk'][key];
        if (ukrainianTranslation && typeof ukrainianTranslation === 'string' && ukrainianTranslation.trim() !== '') {
          console.warn(`Missing translation for key "${String(key)}" in language "${context.currentLanguage}", using Ukrainian fallback`);
          return ukrainianTranslation;
        }
      }
      
      // Use provided fallback or key as last resort
      const finalFallback = fallback || `[${String(key)}]`;
      console.error(`Missing translation for key "${String(key)}" in all languages, using fallback: "${finalFallback}"`);
      return finalFallback as Translation[K];
      
    } catch (error) {
      console.error(`Error getting translation for key "${String(key)}":`, error);
      const errorFallback = fallback || `[${String(key)}]`;
      return errorFallback as Translation[K];
    }
  }, [context.t, context.currentLanguage, context.translations]);
  
  // Enhanced language configuration getter
  const getLanguageConfig = useCallback((lang?: SupportedLanguage) => {
    const targetLang = lang || context.currentLanguage;
    return LANGUAGE_CONFIGS[targetLang];
  }, [context.currentLanguage]);
  
  // Language support checker
  const isLanguageSupported = useCallback((lang: string): lang is SupportedLanguage => {
    return Object.keys(LANGUAGE_CONFIGS).includes(lang);
  }, []);
  
  // Enhanced currency formatting with optional currency override
  const formatCurrency = useCallback((amount: number, currencyCode?: string): string => {
    try {
      const targetCurrency = currencyCode ? 
        Object.values(LANGUAGE_CONFIGS).find(config => config.currency.code === currencyCode)?.currency :
        context.currency;
      
      if (!targetCurrency) {
        console.warn(`Currency not found for code: ${currencyCode}, using current currency`);
        return context.formatPrice(amount);
      }
      
      // If it's the same currency as current, use existing formatPrice
      if (targetCurrency.code === context.currency.code) {
        return context.formatPrice(amount);
      }
      
      // Convert and format for different currency
      const convertedAmount = context.convertPrice(amount);
      return `${convertedAmount.toFixed(2)} ${targetCurrency.symbol}`;
      
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `${amount.toFixed(2)} ${context.currency.symbol}`;
    }
  }, [context.currency, context.formatPrice, context.convertPrice]);
  
  // Enhanced change language with validation
  const changeLanguageWithValidation = useCallback((lang: SupportedLanguage) => {
    try {
      if (!isLanguageSupported(lang)) {
        throw new Error(`Unsupported language: ${lang}`);
      }
      
      context.changeLanguage(lang);
    } catch (error) {
      console.error('Error changing language:', error);
      // Don't change language on error, let the context handle error state
    }
  }, [context.changeLanguage, isLanguageSupported]);
  
  // Memoized available languages for performance
  const memoizedAvailableLanguages = useMemo(() => {
    return context.availableLanguages;
  }, [context.availableLanguages]);
  
  return {
    // Translation data
    t: context.t,
    currentLanguage: context.currentLanguage,
    currency: context.currency,
    availableLanguages: memoizedAvailableLanguages,
    
    // State
    isLoading: context.isLoading,
    error: context.error,
    
    // Actions
    changeLanguage: changeLanguageWithValidation,
    convertPrice: context.convertPrice,
    formatPrice: context.formatPrice,
    
    // Enhanced utilities
    getLanguageConfig,
    isLanguageSupported,
    formatCurrency,
    
    // Type-safe translation function with fallback
    translate
  };
};