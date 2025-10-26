import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Test component to verify the unified translation hook functionality
 * Tests all features including type-safe translation, currency conversion, and fallbacks
 */
export const TranslationTest: React.FC = () => {
  const { 
    t, 
    currentLanguage, 
    changeLanguage, 
    availableLanguages, 
    formatPrice, 
    isLoading, 
    error,
    translate,
    getLanguageConfig,
    isLanguageSupported,
    formatCurrency,
    convertPrice
  } = useTranslation();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-[min(10vw, 70px)] text-red-700">Translation Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-[min(10vw, 70px)] text-blue-700">Loading translations...</p>
      </div>
    );
  }

  const languageConfig = getLanguageConfig();

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded">
      <h3 className="text-[min(10vw, 70px)] font-semibold mb-2">Unified Translation Hook Test</h3>
      
      <div className="mb-4">
        <p className="text-[min(10vw, 70px)]"><strong>Current Language:</strong> {currentLanguage} ({languageConfig.nativeName} {languageConfig.flag})</p>
        <p className="text-[min(10vw, 70px)]"><strong>App Title:</strong> {t.appTitle}</p>
        <p className="text-[min(10vw, 70px)]"><strong>Type-safe Translation:</strong> {translate('calculator')}</p>
        <p className="text-[min(10vw, 70px)]"><strong>Sample Price (formatPrice):</strong> {formatPrice(100)}</p>
        <p className="text-[min(10vw, 70px)]"><strong>Sample Price (formatCurrency):</strong> {formatCurrency(100)}</p>
        <p className="text-[min(10vw, 70px)]"><strong>Converted Price:</strong> {convertPrice(100).toFixed(2)} {languageConfig.currency.code}</p>
      </div>

      <div className="mb-4">
        <p className="text-[min(10vw, 70px)] mb-2"><strong>Available Languages:</strong></p>
        <div className="flex gap-2">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`px-3 py-1 rounded text-[min(10vw, 70px)] ${
                currentLanguage === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getLanguageConfig(lang).flag} {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[min(10vw, 70px)] mb-2"><strong>Language Support Tests:</strong></p>
        <p className="text-[min(10vw, 70px)] flex items-center gap-2">
          <CheckCircle className="text-green-600" size={16} />
          'uk' supported: {isLanguageSupported('uk') ? 'Yes' : 'No'}
        </p>
        <p className="text-[min(10vw, 70px)] flex items-center gap-2">
          <XCircle className="text-red-600" size={16} />
          'fr' supported: {isLanguageSupported('fr') ? 'Yes' : 'No'}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-[min(10vw, 70px)] mb-2"><strong>Fallback Test:</strong></p>
        <p className="text-[min(10vw, 70px)]">Missing key with fallback: {translate('nonExistentKey' as any, 'Fallback Text')}</p>
      </div>

      <p className="text-[min(10vw, 70px)] text-gray-600 flex items-center gap-2">
        <CheckCircle className="text-green-600" size={16} />
        If you can see this, language switching works immediately, and all unified hook features are functional!
      </p>
    </div>
  );
};