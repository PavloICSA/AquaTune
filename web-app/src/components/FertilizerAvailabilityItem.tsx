import React from 'react';
import { FertilizerAvailability, SafetyRating } from '../types/fertilizer';
import { useTranslation } from '../hooks/useTranslation';

interface FertilizerAvailabilityItemProps {
  availability: FertilizerAvailability;
  onSelectionChange: (isSelected: boolean) => void;
  onAmountChange: (amount: string) => void;
}

const FertilizerAvailabilityItem: React.FC<FertilizerAvailabilityItemProps> = ({
  availability,
  onSelectionChange,
  onAmountChange,
}) => {
  const { fertilizer, isSelected, availableAmountKg } = availability;
  const { t, formatPrice } = useTranslation();
  
  const getSafetyColor = (rating: SafetyRating) => {
    switch (rating) {
      case SafetyRating.SAFE:
        return 'text-green-600 bg-green-50 border-green-200';
      case SafetyRating.CAUTION:
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case SafetyRating.RESTRICTED:
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSafetyText = (rating: SafetyRating) => {
    const safetyRatings = t.safetyRatings as Record<string, string>;
    return safetyRatings?.[rating] || rating.toLowerCase();
  };

  return (
    <div className={`border-2 rounded-xl p-4 transition-all duration-300 shadow-md ${
      isSelected 
        ? 'border-lime-500 bg-gradient-to-r from-lime-50 to-white transform scale-105' 
        : 'border-slate-300 bg-white hover:border-blue-400 hover:shadow-lg'
    }`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectionChange(e.target.checked)}
          className="mt-1 h-5 w-5 text-lime-600 focus:ring-lime-500 border-slate-300 rounded"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[min(10vw, 70px)] font-medium text-slate-900 font-lexend">
              {t.fertilizerNames?.[fertilizer.id as keyof typeof t.fertilizerNames] || fertilizer.name}
            </h3>
            <span className={`text-[min(10vw, 70px)] px-3 py-1 rounded-full border-2 font-medium font-arial ${getSafetyColor(fertilizer.safetyRating)}`}>
              {getSafetyText(fertilizer.safetyRating)}
            </span>
          </div>
          
          <div className="text-[min(10vw, 70px)] text-slate-600 space-y-1 font-arial">
            <p>{t.formula} <span className="font-mono bg-slate-100 px-2 py-1 rounded">{fertilizer.chemicalFormula}</span></p>
            <p>{t.price} <span className="font-semibold text-lime-600">{formatPrice(fertilizer.pricePerKg)}/{t.availableAmountKg}</span></p>
            <p className="text-[min(10vw, 70px)]">{fertilizer.description}</p>
            {fertilizer.nutritionalBenefits && fertilizer.nutritionalBenefits.length > 0 && (
              <p className="text-[min(10vw, 70px)] text-blue-600">
                {t.benefits} {fertilizer.nutritionalBenefits.join(', ')}
              </p>
            )}
          </div>
          
          {isSelected && (
            <div className="mt-3">
              <label className="block text-[min(10vw, 70px)] font-medium text-slate-700 mb-1 font-lexend">
                {t.availableAmount}
              </label>
              <input
                type="number"
                value={availableAmountKg || ''}
                onChange={(e) => onAmountChange(e.target.value)}
                placeholder={t.availableAmountPlaceholder}
                className="input-field"
                min="0"
                step="0.001"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerAvailabilityItem;