import React, { useState } from 'react';
import { Calculator, Trash2, Settings } from 'lucide-react';
import { useFertilizerCalculator } from '../hooks/useFertilizerCalculator';
import { useTranslation } from '../hooks/useTranslation';
import { EffectTiming } from '../types/fertilizer';
import InputCard from './InputCard';
import FertilizerAvailabilityItem from './FertilizerAvailabilityItem';
import CalculationResultCard from './CalculationResultCard';
import AboutSection from './AboutSection';
import InstructionsSection from './InstructionsSection';
import WhyAquaTuneSection from './WhyAquaTuneSection';
import DownloadSection from './DownloadSection';
import LanguageSelector from './LanguageSelector';

type AppSection = 'calculator' | 'whyAquaTune' | 'about' | 'instructions' | 'download';

const FertilizerCalculatorApp: React.FC = () => {
  const { state, actions } = useFertilizerCalculator();
  const { t, currentLanguage, isLoading, error } = useTranslation();
  const [activeSection, setActiveSection] = useState<AppSection>('calculator');

  // Debug: Log the translation object
  console.log('FertilizerCalculatorApp - Translation object:', t);
  console.log('FertilizerCalculatorApp - Current language:', currentLanguage);
  console.log('FertilizerCalculatorApp - App title:', t?.appTitle);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-[min(10vw, 70px)] text-gray-600 font-arial">Loading translations...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-[min(10vw, 70px)] text-red-800 font-semibold mb-2 font-lexend">Translation Error</h2>
          <p className="text-[min(10vw, 70px)] text-red-600 mb-4 font-arial">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <span className="text-[min(10vw, 70px)] font-arial">Reload Page</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full [&>div]:absolute [&>div]:bottom-0 [&>div]:right-0 [&>div]:z-[-2] [&>div]:h-full [&>div]:w-full [&>div]:bg-gradient-to-b [&>div]:from-blue-200 [&>div]:to-white">
            <div></div>
          </div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 text-slate-900">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-4">
                  <img src="/sprayer.png" alt="AquaTune" className="w-24 h-24" />
                  <div className="aquatune-title">
                    <span style={{ color: '#1e40af' }}>Aqua</span>
                    <span style={{ color: '#32cd32' }}>Tune</span>
                  </div>
                </div>
                <p className="text-[min(4vw, 22px)] text-blue-700 font-lexend font-extrabold mt-2 text-center">
                  {t.appMotto}
                </p>
              </div>
              <LanguageSelector />
            </div>
          </div>

          {/* Navigation */}
          <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-t border-gray-200">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize">
              <button
                onClick={() => setActiveSection('whyAquaTune')}
                className={`mx-1.5 sm:mx-6 border-b-2 transition-colors ${activeSection === 'whyAquaTune'
                  ? 'text-slate-900 border-lime-500'
                  : 'border-transparent hover:text-slate-900 hover:border-lime-500'
                  }`}
              >
                {t.whyAquaTune}
              </button>
              <button
                onClick={() => setActiveSection('calculator')}
                className={`mx-1.5 sm:mx-6 border-b-2 transition-colors ${activeSection === 'calculator'
                  ? 'text-slate-900 border-lime-500'
                  : 'border-transparent hover:text-slate-900 hover:border-lime-500'
                  }`}
              >
                {t.calculator}
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`mx-1.5 sm:mx-6 border-b-2 transition-colors ${activeSection === 'about'
                  ? 'text-slate-900 border-lime-500'
                  : 'border-transparent hover:text-slate-900 hover:border-lime-500'
                  }`}
              >
                {t.about}
              </button>
              <button
                onClick={() => setActiveSection('instructions')}
                className={`mx-1.5 sm:mx-6 border-b-2 transition-colors ${activeSection === 'instructions'
                  ? 'text-slate-900 border-lime-500'
                  : 'border-transparent hover:text-slate-900 hover:border-lime-500'
                  }`}
              >
                {t.instructions}
              </button>
              <button
                onClick={() => setActiveSection('download')}
                className={`mx-1.5 sm:mx-6 border-b-2 transition-colors ${activeSection === 'download'
                  ? 'text-slate-900 border-lime-500'
                  : 'border-transparent hover:text-slate-900 hover:border-lime-500'
                  }`}
              >
                {t.download}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-56">
        {activeSection === 'whyAquaTune' && <WhyAquaTuneSection />}
        {activeSection === 'download' && <DownloadSection />}
        {activeSection === 'calculator' && (
          <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
              <div className="absolute top-0 -right-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-300/40 dark:from-emerald-800/20 dark:to-teal-700/20 blur-3xl" />
              <div className="absolute -bottom-1/4 -left-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/40 dark:from-blue-800/20 dark:to-indigo-700/20 blur-3xl" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-6">



              {/* Required Inputs */}
              <div className="gradient-lime-blue border border-blue-300 rounded-xl p-6 mb-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[min(4vw, 20px)] font-semibold text-blue-700 flex items-center gap-2 font-lexend">
                    <span className="text-blue-600">*</span>
                    {t.requiredParameters}
                  </h3>
                  <button
                    onClick={actions.toggleExpertMode}
                    className="btn btn-circle btn-outline"
                    style={{ '--btn-color': '#1e40af' } as React.CSSProperties}
                    aria-label="Expert Mode Toggle"
                  >
                    <Settings className="w-5 h-5 shrink-0" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[min(3vw, 14px)] font-medium text-slate-700 mb-1 font-lexend">
                      {t.volumeL} *
                    </label>
                    <input
                      type="number"
                      value={state.volumeL || ''}
                      onChange={(e) => actions.updateVolume(e.target.value)}
                      placeholder={t.volumePlaceholder}
                      className="input-field"
                      min="0"
                      step="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[min(3vw, 14px)] font-medium text-slate-700 mb-1 font-lexend">
                      {t.initialPH} *
                    </label>
                    <input
                      type="number"
                      value={state.pHInit || ''}
                      onChange={(e) => actions.updatePHInit(e.target.value)}
                      placeholder={t.initialPHPlaceholder}
                      className="input-field"
                      min="0"
                      max="14"
                      step="0.1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[min(3vw, 14px)] font-medium text-slate-700 mb-1 font-lexend">
                      {t.targetPH} *
                    </label>
                    <input
                      type="number"
                      value={state.pHTarget || ''}
                      onChange={(e) => actions.updatePHTarget(e.target.value)}
                      placeholder={t.targetPHPlaceholder}
                      className="input-field"
                      min="0"
                      max="14"
                      step="0.1"
                      required
                    />
                    <p className="text-[min(2.5vw, 12px)] text-slate-500 mt-1 font-arial">{t.recommended}</p>
                  </div>

                  <div>
                    <label className="block text-[min(3vw, 14px)] font-medium text-slate-700 mb-1 font-lexend">
                      {t.alkalinity} *
                    </label>
                    <input
                      type="number"
                      value={state.alkalinityMgLAsCaCO3 || ''}
                      onChange={(e) => actions.updateAlkalinity(e.target.value)}
                      placeholder={t.alkalinityPlaceholder}
                      className="input-field"
                      min="0"
                      step="1"
                      required
                    />
                    <p className="text-[min(2.5vw, 12px)] text-slate-500 mt-1 font-arial">{t.alkalinityUnit}</p>
                  </div>
                </div>
              </div>

              {/* Effect Timing Selection */}
              <InputCard
                title={t.effectTiming}
                subtitle={t.whenNeeded}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.values(EffectTiming).map((timing) => (
                    <label key={timing} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/50 transition-colors">
                      <input
                        type="radio"
                        name="effectTiming"
                        value={timing}
                        checked={state.requiredEffectTiming === timing}
                        onChange={() => actions.updateEffectTiming(timing)}
                        className="form-radio h-5 w-5 text-lime-600"
                      />
                      <div>
                        <div className="text-[min(3vw, 16px)] font-medium font-lexend">
                          {timing === EffectTiming.IMMEDIATE && t.immediate}
                          {timing === EffectTiming.WITHIN_24H && t.within24h}
                          {timing === EffectTiming.NO_RUSH && t.noRush}
                        </div>
                        <div className="text-[min(2.5vw, 14px)] text-slate-500 font-arial">
                          {timing === EffectTiming.IMMEDIATE && t.immediateDesc}
                          {timing === EffectTiming.WITHIN_24H && t.within24hDesc}
                          {timing === EffectTiming.NO_RUSH && t.noRushDesc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </InputCard>

              {/* Expert Mode Options */}
              {state.showExpertMode && (
                <InputCard
                  title={t.additionalParameters}
                  subtitle={t.optionalParameters}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[min(10vw, 70px)] font-medium text-slate-700 mb-1 font-lexend">
                        {t.temperature}
                      </label>
                      <input
                        type="number"
                        value={state.temperatureC || ''}
                        onChange={(e) => actions.updateTemperature(e.target.value)}
                        placeholder={t.temperaturePlaceholder}
                        className="input-field"
                        min="0"
                        max="50"
                        step="1"
                      />
                    </div>

                    <div>
                      <label className="block text-[min(10vw, 70px)] font-medium text-slate-700 mb-1 font-lexend">
                        {t.fertilizerPurity}
                      </label>
                      <input
                        type="number"
                        value={state.fertilizerPurity || ''}
                        onChange={(e) => actions.updateFertilizerPurity(e.target.value)}
                        placeholder={t.fertilizerPurityPlaceholder}
                        className="input-field"
                        min="50"
                        max="100"
                        step="1"
                      />
                    </div>
                  </div>
                </InputCard>
              )}

              {/* Available Fertilizers */}
              <InputCard
                title={t.availableFertilizers}
                subtitle={t.selectFertilizers}
              >
                <div className="space-y-4 focus: border-blue-800">
                  {state.availableFertilizers.map((availability) => (
                    <FertilizerAvailabilityItem
                      key={availability.fertilizer.id}
                      availability={availability}
                      onSelectionChange={(isSelected) =>
                        actions.updateFertilizerAvailability(
                          availability.fertilizer.id,
                          availability.availableAmountKg.toString(),
                          isSelected
                        )
                      }
                      onAmountChange={(amount) =>
                        actions.updateFertilizerAvailability(
                          availability.fertilizer.id,
                          amount,
                          availability.isSelected
                        )
                      }
                    />
                  ))}
                </div>
              </InputCard>

              {/* Calculate Button */}
              <div className="flex gap-4">
                <button
                  onClick={actions.calculateFertilizers}
                  disabled={state.isCalculating}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.isCalculating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Calculator size={20} />
                  )}
                  <span className="text-[min(10vw, 70px)] font-lexend">{state.isCalculating ? t.calculating : t.calculate}</span>
                </button>

                {state.calculationResult && (
                  <button
                    onClick={actions.clearResults}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Trash2 size={20} />
                    <span className="text-[min(10vw, 70px)] font-lexend">{t.clear}</span>
                  </button>
                )}
              </div>

              {/* Results */}
              {state.calculationResult && (
                <CalculationResultCard result={state.calculationResult} />
              )}
            </div>
          </div>
        )}

        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'instructions' && <InstructionsSection />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[min(10vw, 70px)] text-gray-300 font-arial">
            {t.developedFor}
          </p>
          <p className="text-[min(2.5vw, 12px)] text-gray-400 mt-4">
            <a href="https://www.flaticon.com/free-icons/sprayer" title="sprayer icons" className="hover:text-gray-300 transition-colors">
              {t.iconAttribution}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FertilizerCalculatorApp;