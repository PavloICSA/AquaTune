import { BookOpen, Beaker, Calculator, Shield, Award, Medal } from 'lucide-react';
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
        <div className="absolute top-0 -right-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-300/40 dark:from-emerald-800/20 dark:to-teal-700/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/40 dark:from-blue-800/20 dark:to-indigo-700/20 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-[min(10vw, 70px)] font-bold text-slate-900 mb-4 flex items-center justify-center gap-3 font-lexend">
            <BookOpen className="text-blue-600" size={32} />
            {t.aboutTitle}
          </h1>
          <p className="text-[min(10vw, 70px)] text-slate-600 max-w-4xl mx-auto font-arial">
            {t.aboutDescription}
          </p>
        </div>

        {/* Scientific Methodology */}
        <div className="gradient-lime-blue border border-blue-300 rounded-xl p-6 shadow-lg">
          <h2 className="text-[min(10vw, 70px)] font-semibold font-lexend text-blue-800 mb-4 flex items-center gap-2">
            <Beaker className="text-blue-600" size={24} />
            {t.methodology}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-700 mb-3 font-lexend">{t.carbonateSystem}</h3>
              <div className="space-y-2 text-[min(10vw, 70px)] text-blue-700 font-arial">
                <p>• {t.hendersonHasselbalch}</p>
                <p>• {t.alphaFractions}</p>
                <p>• {t.bufferCapacity}</p>
                <p>• {t.temperatureCorrections}</p>
              </div>
            </div>

            <div>
              <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-700 mb-3 font-lexend">{t.nitrification}</h3>
              <div className="space-y-2 text-[min(10vw, 70px)] text-blue-700 font-arial">
                <p>• NH₄⁺ + 2O₂ → NO₃⁻ + 2H⁺ + H₂O</p>
                <p>• {t.biologicalPotential}</p>
                <p>• {t.timeFrames}</p>
                <p>• {t.aerobicConditions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="gradient-lime-white border border-lime-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="text-lime-600" size={24} />
              <h3 className="text-[min(10vw, 70px)] font-semibold text-lime-800 font-lexend">{t.accurateCalculations}</h3>
            </div>
            <ul className="space-y-2 text-[min(10vw, 70px)] text-lime-700 font-arial">
              <li>• {t.carbonateBuffer}</li>
              <li>• {t.nitrificationPotential}</li>
              <li>• {t.precipitationRisks}</li>
              <li>• {t.economicOptimization}</li>
            </ul>
          </div>

          <div className="gradient-blue-slate border border-blue-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-600" size={24} />
              <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-800 font-lexend">{t.safety}</h3>
            </div>
            <ul className="space-y-2 text-[min(10vw, 70px)] text-blue-700 font-arial">
              <li>• {t.onlySafeFertilizers}</li>
              <li>• {t.jarTestProtocol}</li>
              <li>• {t.riskWarnings}</li>
              <li>• {t.safetyMeasuresDetailed}</li>
            </ul>
          </div>

          <div className="gradient-slate-white border border-slate-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-slate-600" size={24} />
              <h3 className="text-[min(10vw, 70px)] font-semibold text-slate-800 font-lexend">{t.scientificBase}</h3>
            </div>
            <ul className="space-y-2 text-[min(10vw, 70px)] text-slate-700 font-arial">
              <li>• {t.peerReviewedResearch}</li>
              <li>• {t.practicalExperience}</li>
              <li>• {t.internationalStandards}</li>
              <li>• {t.continuousUpdates}</li>
            </ul>
          </div>
        </div>

        {/* Scientific Basis */}
        <div className="gradient-slate-white border border-slate-300 rounded-xl p-6 shadow-lg">
          <h2 className="text-[min(10vw, 70px)] font-semibold text-slate-800 mb-4 font-lexend">{t.scientificBasis}</h2>

          <div className="space-y-4 text-[min(10vw, 70px)] text-slate-700 font-arial">
            <div>
              <h3 className="text-[min(10vw, 70px)] font-semibold mb-2 font-lexend">{t.hendersonHasselbalchEquation}</h3>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-200 font-mono text-[min(10vw, 70px)] text-center shadow-inner">
                pH = pKa + log([A⁻]/[HA])
              </div>
              <p className="text-[min(10vw, 70px)] mt-2">
                {t.hendersonDescription}
              </p>
            </div>

            <div>
              <h3 className="text-[min(10vw, 70px)] font-semibold mb-2 font-lexend">{t.carbonateSystemEquations}</h3>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-200 space-y-2 font-mono text-[min(10vw, 70px)] shadow-inner">
                <div>{t.carbonateSystemFormula}</div>
                <div>{t.carbonateConstants}</div>
                <div>{t.carbonateConstants2}</div>
              </div>
            </div>

            <div>
              <h3 className="text-[min(10vw, 70px)] font-semibold mb-2 font-lexend">{t.nitrificationEquations}</h3>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-200 space-y-2 font-mono text-[min(10vw, 70px)] shadow-inner">
                <div>{t.nitrificationStep1}</div>
                <div>{t.nitrificationStep2}</div>
                <div>{t.nitrificationOverall}</div>
              </div>
              <p className="text-[min(10vw, 70px)] mt-2">
                {t.nitrificationDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Fertilizer Categories */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
          <h2 className="text-[min(10vw, 70px)] font-semibold text-slate-800 mb-4 font-lexend">{t.fertilizerCategories}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[min(10vw, 70px)] font-semibold text-lime-700 mb-3 flex items-center gap-2 font-lexend">
                <Award className="text-lime-600" size={20} />
                {t.ammoniumFertilizers}
              </h3>
              <ul className="space-y-2 text-[min(10vw, 70px)] text-slate-700 font-arial">
                <li>• <strong>{t.ammoniumSulfate}</strong> - {t.mostEffective}</li>
                <li>• <strong>{t.ammoniumNitrate}</strong> - {t.fastActing}</li>
                <li>• <strong>{t.mapFertilizer}</strong> - {t.immediateEffectPlusP}</li>
                <li>• <strong>{t.asnFertilizer}</strong> - {t.balanced}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-700 mb-3 flex items-center gap-2 font-lexend">
                <Medal className="text-blue-600" size={20} />
                {t.sulfateFertilizers}
              </h3>
              <ul className="space-y-2 text-[min(10vw, 70px)] text-slate-700 font-arial">
                <li>• <strong>{t.magnesiumSulfate}</strong> - {t.mgPlusS}</li>
                <li>• <strong>{t.potassiumSulfate}</strong> - {t.kPlusWeakAcidification}</li>
                <li>• <strong>{t.ironSulfate}</strong> - {t.fePlusAcidification}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-300 rounded-xl p-4 shadow-lg">
          <p className="text-[min(10vw, 70px)] text-red-800 font-arial">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;