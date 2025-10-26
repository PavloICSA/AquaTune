# Translation Infrastructure

This directory contains the core translation infrastructure for the fertilizer calculator application.

## Components

### TranslationProvider
The main context provider that manages translation state and provides translation functions to the entire application.

### useTranslation Hook
A unified hook that replaces the existing `useI18n` and `useI18nSimple` hooks. Provides:
- Type-safe translation function (`t`)
- Language switching (`changeLanguage`)
- Currency conversion (`convertPrice`, `formatPrice`)
- Loading and error states

### TranslationErrorBoundary
Error boundary component that gracefully handles translation-related errors with fallback UI.

## Integration Example

To integrate the new translation system into your app:

```tsx
// src/App.tsx
import { TranslationProvider, TranslationErrorBoundary } from './contexts';
import FertilizerCalculatorApp from './components/FertilizerCalculatorApp';

function App() {
  return (
    <TranslationErrorBoundary>
      <TranslationProvider>
        <div className="min-h-screen bg-gray-50">
          <FertilizerCalculatorApp />
        </div>
      </TranslationProvider>
    </TranslationErrorBoundary>
  );
}

export default App;
```

## Usage in Components

```tsx
// In any component
import { useTranslation } from '../hooks/useTranslation';

const MyComponent = () => {
  const { t, currentLanguage, changeLanguage, formatPrice } = useTranslation();
  
  return (
    <div>
      <h1>{t.appTitle}</h1>
      <p>Current language: {currentLanguage}</p>
      <p>Price: {formatPrice(100)}</p>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
};
```

## Features

- **Immediate Language Switching**: No page refresh required
- **Type Safety**: Full TypeScript support for translation keys
- **Error Handling**: Graceful fallbacks when translations fail
- **Currency Conversion**: Automatic price conversion based on language
- **Persistence**: Language preference saved to localStorage
- **Fallback Logic**: Falls back to Ukrainian if translation missing

## Migration

This infrastructure replaces:
- `useI18n` hook
- `useI18nSimple` hook
- Manual translation state management

All existing translation keys are preserved and work with the new system.