import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const WhyAquaTuneSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
        <div className="absolute top-0 -right-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-300/40 dark:from-emerald-800/20 dark:to-teal-700/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/40 dark:from-blue-800/20 dark:to-indigo-700/20 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-[min(6vw, 48px)] font-bold text-slate-900 mb-4 flex items-center justify-center gap-3 font-lexend">
            <HelpCircle className="text-blue-600" size={32} />
            {t.whyAquaTuneTitle}
          </h1>
        </div>

        {/* Main Content */}
        <div className="gradient-lime-blue border border-blue-300 rounded-xl p-8 shadow-lg">
          <div className="prose prose-lg max-w-none">
            <div className="text-[min(3.5vw, 18px)] text-slate-700 leading-relaxed font-arial whitespace-pre-line text-justify">
              {t.whyAquaTuneContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyAquaTuneSection;