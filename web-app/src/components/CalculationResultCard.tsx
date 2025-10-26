import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, AlertTriangle, Beaker, BarChart3, CheckCircle, RotateCcw, Microscope } from 'lucide-react';
import { CalculationResult } from '../types/fertilizer';
import { useTranslation } from '../hooks/useTranslation';

interface CalculationResultCardProps {
  result: CalculationResult;
}

const CalculationResultCard: React.FC<CalculationResultCardProps> = ({ result }) => {
  const [showScientificDetails, setShowScientificDetails] = useState(false);
  const [showJarTest, setShowJarTest] = useState(false);
  const { t, formatPrice } = useTranslation();

  return (
    <div className="calculation-results bg-gradient-to-r from-lime-50 to-blue-50 border border-lime-300 rounded-xl p-6 shadow-lg">
      <h2 className="text-[min(10vw, 70px)] font-bold text-slate-900 mb-4 flex items-center gap-2 font-lexend">
        <BarChart3 className="text-blue-600" size={24} />
        {t.calculationResultsTitle}
      </h2>
      
      {/* Main Recommendation */}
      {result.recommendedFertilizers.length > 0 && (
        <div className="mb-6">
          <div className="gradient-lime-white border border-lime-400 rounded-xl p-4 mb-4 shadow-md">
            <h3 className="text-[min(10vw, 70px)] font-semibold text-lime-800 mb-2 flex items-center gap-2 font-lexend">
              <CheckCircle className="text-lime-600" size={20} />
              {t.mainRecommendation}
            </h3>
            <div className="text-[min(10vw, 70px)] text-lime-700 whitespace-pre-line font-arial">
              {result.explanation}
            </div>
          </div>

          {/* Detailed Fertilizer Info */}
          <div className="space-y-3">
            {result.recommendedFertilizers.map((recommendation, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-slate-300 shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-[min(10vw, 70px)] font-medium text-slate-900 flex items-center gap-2 font-lexend">
                      {t.fertilizerNames?.[recommendation.fertilizer.id as keyof typeof t.fertilizerNames] || recommendation.fertilizer.name}
                      <span className="text-[min(10vw, 70px)] bg-slate-100 px-2 py-1 rounded-lg font-arial">
                        {recommendation.fertilizer.chemicalFormula}
                      </span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[min(10vw, 70px)]">
                      <div>
                        <span className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.amount}</span>
                        <div className="text-[min(10vw, 70px)] font-semibold font-arial">{recommendation.amountG.toFixed(1)} {t.gramsUnit}</div>
                      </div>
                      <div>
                        <span className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.effect}</span>
                        <div className="text-[min(10vw, 70px)] font-semibold flex items-center gap-1 font-arial">
                          <Clock size={12} />
                          {recommendation.timeToEffect}
                        </div>
                      </div>
                      <div>
                        <span className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.type}</span>
                        <div className="text-[min(10vw, 70px)] font-semibold font-arial">
                          {recommendation.effectType === 'biological' ? t.biological : t.immediate}
                        </div>
                      </div>
                      <div>
                        <span className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.cost}</span>
                        <div className="text-[min(10vw, 70px)] font-semibold text-lime-600 font-arial">
                          {formatPrice(recommendation.cost)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Side Effects */}
                    {recommendation.sideEffects.length > 0 && (
                      <div className="mt-2">
                        <span className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.additionalBenefits}</span>
                        <span className="text-[min(10vw, 70px)] text-blue-600 font-arial">
                          {recommendation.sideEffects.join(', ')}
                        </span>
                      </div>
                    )}
                    
                    {/* Warnings */}
                    {(recommendation.precipitationRisk || recommendation.saltLoadIncrease > 2) && (
                      <div className="mt-2 flex items-center gap-1 text-[min(10vw, 70px)] text-orange-600 font-arial">
                        <AlertTriangle size={12} />
                        {recommendation.precipitationRisk && `${t.precipitationRisk} • `}
                        {recommendation.saltLoadIncrease > 2 && `${t.highSaltLoad} (${recommendation.saltLoadIncrease.toFixed(1)} mS/cm)`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Alternative Recommendation */}
          {result.alternativeRecommendation && (
            <div className="gradient-blue-slate border border-blue-300 rounded-xl p-4 mt-4 shadow-md">
              <h4 className="text-[min(10vw, 70px)] font-medium text-blue-800 mb-2 flex items-center gap-2 font-lexend">
                <RotateCcw className="text-blue-600" size={16} />
                {t.alternativeRecommendationColon}
              </h4>
              <div className="text-[min(10vw, 70px)] text-blue-700 font-arial">
                <strong>{t.fertilizerNames?.[result.alternativeRecommendation.fertilizer.id as keyof typeof t.fertilizerNames] || result.alternativeRecommendation.fertilizer.name}:</strong> {' '}
                {result.alternativeRecommendation.amountG.toFixed(1)} {t.gramsUnit} • {' '}
                {result.alternativeRecommendation.timeToEffect} • {' '}
                {formatPrice(result.alternativeRecommendation.cost)}
              </div>
            </div>
          )}
          
          {/* Summary */}
          <div className="gradient-slate-white border border-slate-300 rounded-xl p-4 mt-4 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[min(10vw, 70px)] font-bold text-lime-600 font-lexend">{result.finalPh.toFixed(2)}</div>
                <div className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.finalPH}</div>
              </div>
              <div>
                <div className="text-[min(10vw, 70px)] font-bold text-blue-600 font-lexend">{formatPrice(result.totalCost)}</div>
                <div className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.totalCost}</div>
              </div>
              <div>
                <div className="text-[min(10vw, 70px)] font-bold text-slate-600 font-lexend">{result.timeToEffect}</div>
                <div className="text-[min(10vw, 70px)] text-slate-600 font-arial">{t.timeToEffect}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-300 rounded-xl p-4 shadow-lg">
            <h3 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-3 flex items-center gap-2 font-lexend">
              <AlertTriangle className="text-red-600" size={20} />
              {t.warningsAndSafety}
            </h3>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li key={index} className="text-[min(10vw, 70px)] text-red-700 flex items-start gap-2 font-arial">
                  <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Jar Test Instructions */}
      {result.jarTestInstructions && (
        <div className="mb-6">
          <button
            onClick={() => setShowJarTest(!showJarTest)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 shadow-md"
          >
            <div className="flex items-center gap-2">
              <Beaker className="text-yellow-600" size={20} />
              <span className="text-[min(10vw, 70px)] font-semibold text-yellow-800 font-lexend">{t.jarTestInstructionsTitle}</span>
            </div>
            {showJarTest ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {showJarTest && (
            <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-xl p-4 shadow-inner">
              <pre className="text-[min(10vw, 70px)] text-yellow-800 whitespace-pre-wrap leading-relaxed font-arial">
                {result.jarTestInstructions}
              </pre>
            </div>
          )}
        </div>
      )}
      
      {/* Scientific Details */}
      <div className="gradient-blue-slate border border-blue-300 rounded-xl shadow-lg">
        <button
          onClick={() => setShowScientificDetails(!showScientificDetails)}
          className="w-full flex items-center justify-between p-4 hover:bg-blue-100/50 transition-all duration-300 rounded-xl"
        >
          <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-800 flex items-center gap-2 font-lexend">
            <Microscope className="text-blue-600" size={20} />
            {t.scientificReasoningTitle}
          </h3>
          {showScientificDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {showScientificDetails && (
          <div className="px-4 pb-4">
            <div className="text-[min(10vw, 70px)] text-blue-700 whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-lg border-2 border-blue-200 shadow-inner font-arial">
              {result.scientificReasoning.split('\n').map((line, index) => (
                <div key={index} className="mb-1 font-arial">
                  <span dangerouslySetInnerHTML={{ 
                    __html: line
                      .replace(/K₁/g, 'K<sub>1</sub>')
                      .replace(/K₂/g, 'K<sub>2</sub>')
                      .replace(/Ka1/g, 'K<sub>a1</sub>')
                      .replace(/Ka2/g, 'K<sub>a2</sub>')
                      .replace(/CaCO₃/g, 'CaCO<sub>3</sub>')
                      .replace(/H⁺/g, 'H<sup>+</sup>')
                      .replace(/H\+/g, 'H<sup>+</sup>')
                      .replace(/×/g, '×')
                      .replace(/10⁻(\d+)/g, '10<sup>-$1</sup>')
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationResultCard;