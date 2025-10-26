import React, { createContext, useContext, useReducer, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { SupportedLanguage, Translation, CurrencyInfo, SUPPORTED_CURRENCIES, EXCHANGE_RATES } from '../i18n';
import { uk } from '../i18n/translations/uk';
import { en } from '../i18n/translations/en';
import { es } from '../i18n/translations/es';
import { de } from '../i18n/translations/de';

// Translation state interface
export interface TranslationState {
  currentLanguage: SupportedLanguage;
  translations: Record<SupportedLanguage, Translation>;
  currency: CurrencyInfo;
  isLoading: boolean;
  error: string | null;
}

// Translation actions interface
export interface TranslationActions {
  changeLanguage: (lang: SupportedLanguage) => void;
  convertPrice: (priceUAH: number) => number;
  formatPrice: (priceUAH: number) => string;
}

// Combined context interface
export interface TranslationContextType extends TranslationState, TranslationActions {
  t: Translation;
  availableLanguages: SupportedLanguage[];
}

// Action types for reducer
type TranslationAction =
  | { type: 'SET_LANGUAGE'; payload: SupportedLanguage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Load all translations
const translations: Record<SupportedLanguage, Translation> = {
  uk,
  en,
  es,
  de
};

// Get stored language with fallback logic
const getStoredLanguage = (): SupportedLanguage => {
  try {
    const stored = localStorage.getItem('fertilizer-calc-language');
    if (stored && Object.keys(translations).includes(stored)) {
      return stored as SupportedLanguage;
    }
  } catch (error) {
    console.warn('localStorage not available:', error);
  }
  
  // Auto-detect from browser
  try {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('uk')) return 'uk';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('en')) return 'en';
  } catch (error) {
    console.warn('navigator.language not available:', error);
  }
  
  return 'uk'; // default to Ukrainian
};

// Initial state
const initialState: TranslationState = {
  currentLanguage: getStoredLanguage(),
  translations,
  currency: SUPPORTED_CURRENCIES[getStoredLanguage()],
  isLoading: false,
  error: null
};

// Reducer function
const translationReducer = (state: TranslationState, action: TranslationAction): TranslationState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        currentLanguage: action.payload,
        currency: SUPPORTED_CURRENCIES[action.payload],
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

// Create context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider component interface
interface TranslationProviderProps {
  children: ReactNode;
}

// Translation Provider Component
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(translationReducer, initialState);

  // Change language function with useCallback for performance
  const changeLanguage = useCallback((lang: SupportedLanguage) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Validate language
      if (!Object.keys(translations).includes(lang)) {
        throw new Error(`Unsupported language: ${lang}`);
      }

      // Update state
      dispatch({ type: 'SET_LANGUAGE', payload: lang });
      
      // Persist to localStorage
      try {
        localStorage.setItem('fertilizer-calc-language', lang);
      } catch (error) {
        console.warn('Could not save language preference:', error);
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error changing language:', error);
    }
  }, []);

  // Convert price from UAH to current currency with useCallback for performance
  const convertPrice = useCallback((priceUAH: number): number => {
    try {
      if (state.currentLanguage === 'uk') return priceUAH;
      
      const exchangeKey = `UAH_${state.currency.code}`;
      const rate = EXCHANGE_RATES[exchangeKey] || 1;
      return priceUAH * rate;
    } catch (error) {
      console.error('Error converting price:', error);
      return priceUAH; // Return original price on error
    }
  }, [state.currentLanguage, state.currency.code]);

  // Format price with currency symbol with useCallback for performance
  const formatPrice = useCallback((priceUAH: number): string => {
    try {
      const convertedPrice = convertPrice(priceUAH);
      return `${convertedPrice.toFixed(2)} ${state.currency.symbol}`;
    } catch (error) {
      console.error('Error formatting price:', error);
      return `${priceUAH.toFixed(2)} ₴`; // Fallback to UAH
    }
  }, [convertPrice, state.currency.symbol]);

  // Get current translation with fallback, memoized for performance
  const getCurrentTranslation = useMemo((): Translation => {
    return state.translations[state.currentLanguage] || state.translations['uk'];
  }, [state.currentLanguage, state.translations]);

  // Effect to handle language changes
  useEffect(() => {
    // Log language change for debugging
    console.log('Language changed to:', state.currentLanguage);
    console.log('Currency changed to:', state.currency);
  }, [state.currentLanguage, state.currency]);

  // Memoized available languages for performance
  const availableLanguages = useMemo(() => {
    return Object.keys(translations) as SupportedLanguage[];
  }, []);

  // Context value memoized to prevent unnecessary re-renders
  const contextValue: TranslationContextType = useMemo(() => ({
    ...state,
    t: getCurrentTranslation,
    availableLanguages,
    changeLanguage,
    convertPrice,
    formatPrice
  }), [state, getCurrentTranslation, availableLanguages, changeLanguage, convertPrice, formatPrice]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translation context
export const useTranslationContext = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  
  return context;
};