import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { SupportedLanguage } from '../i18n';

// Map language codes to display codes
const getDisplayCode = (langCode: SupportedLanguage): string => {
  const codeMap: Record<SupportedLanguage, string> = {
    'uk': 'UA', // Ukraine
    'en': 'US', // United States
    'es': 'ES', // Spain
    'de': 'DE'  // Germany
  };
  return codeMap[langCode];
};

const LanguageSelector: React.FC = () => {
  const { 
    currentLanguage, 
    changeLanguage, 
    availableLanguages, 
    getLanguageConfig,
    isLoading 
  } = useTranslation();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle language change with immediate switching
  const handleLanguageChange = (lang: SupportedLanguage) => {
    changeLanguage(lang);
    setIsOpen(false);
    
    // Focus back to button for accessibility
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Handle option key navigation
  const handleOptionKeyDown = (event: React.KeyboardEvent, lang: SupportedLanguage) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLanguageChange(lang);
    }
  };

  const currentConfig = getLanguageConfig(currentLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-slate-900 rounded-lg hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 border border-white/30 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label={`Current language: ${currentConfig.nativeName} (${getDisplayCode(currentLanguage)}). Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="button"
      >
        <Globe size={16} aria-hidden="true" />
        <span className="text-sm font-medium">
          {getDisplayCode(currentLanguage)}
        </span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/50 py-2 min-w-48 z-50"
          role="listbox"
          aria-label="Language options"
        >
          {availableLanguages.map((lang) => {
            const config = getLanguageConfig(lang);
            const isSelected = currentLanguage === lang;
            
            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                onKeyDown={(e) => handleOptionKeyDown(e, lang)}
                className={`w-full text-left px-4 py-3 hover:bg-lime-50 focus:bg-lime-50 focus:outline-none transition-colors ${
                  isSelected ? 'bg-lime-100 text-lime-800' : 'text-slate-700'
                }`}
                role="option"
                aria-selected={isSelected}
                aria-label={`Select ${config.nativeName} language with ${config.currency.name} currency`}
                tabIndex={0}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className="text-lg">{config.flag}</span>
                    <span className="text-sm font-medium">{config.nativeName}</span>
                    {isSelected && (
                      <span className="text-lime-600 text-sm" aria-label="Currently selected">
                        ✓
                      </span>
                    )}
                  </span>
                  <span 
                    className="text-sm text-slate-500 font-mono"
                    aria-label={`Currency: ${config.currency.name}`}
                  >
                    {config.currency.symbol}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;