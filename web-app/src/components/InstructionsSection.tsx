import React, { useState } from 'react';
import { FileText, Shield, AlertTriangle, CheckCircle, Beaker, Clock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const InstructionsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'usage' | 'safety' | 'jartest'>('usage');

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
        <div className="absolute top-0 -right-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-300/40 dark:from-emerald-800/20 dark:to-teal-700/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/40 dark:from-blue-800/20 dark:to-indigo-700/20 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-[min(10vw, 70px)] font-bold text-slate-900 mb-4 flex items-center justify-center gap-3 font-lexend">
          <FileText className="text-blue-600" size={32} />
          {t.instructionsTitle}
        </h1>
        <p className="text-[min(10vw, 70px)] text-slate-600 max-w-4xl mx-auto font-arial">
          {t.instructionsDescription}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('usage')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 font-lexend ${
            activeTab === 'usage'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300'
          }`}
        >
          <FileText size={20} className="inline mr-2" />
          <span className="text-[min(10vw, 70px)]">{t.stepByStepTab}</span>
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 font-lexend ${
            activeTab === 'safety'
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
              : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300'
          }`}
        >
          <Shield size={20} className="inline mr-2" />
          <span className="text-[min(10vw, 70px)]">{t.safetyProtocolsTab}</span>
        </button>
        <button
          onClick={() => setActiveTab('jartest')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 font-lexend ${
            activeTab === 'jartest'
              ? 'bg-gradient-to-r from-lime-600 to-lime-700 text-white shadow-lg'
              : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300'
          }`}
        >
          <Beaker size={20} className="inline mr-2" />
          <span className="text-[min(10vw, 70px)]">{t.jarTestProtocolTab}</span>
        </button>
      </div>

      {/* Usage Instructions */}
      {activeTab === 'usage' && (
        <div className="space-y-6">
          <div className="gradient-blue-slate border border-blue-300 rounded-xl p-6 shadow-lg">
            <h2 className="text-[min(10vw, 70px)] font-semibold text-blue-800 mb-4 font-lexend">
              {t.stepByStepInstructions}
            </h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-800 mb-2 font-lexend">
                    {t.enterRequiredParameters}
                  </h3>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-blue-700 font-arial">
                    <li>• <strong>{t.volumeL}:</strong> {t.tankVolumeDesc}</li>
                    <li>• <strong>{t.initialPH}:</strong> {t.initialPHDesc}</li>
                    <li>• <strong>{t.targetPH}:</strong> {t.targetPHDesc}</li>
                    <li>• <strong>{t.alkalinity}:</strong> {t.alkalinityDesc}</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-800 mb-2 font-lexend">
                    {t.selectEffectSpeed}
                  </h3>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-blue-700 font-arial">
                    <li>• <strong>{t.immediate}:</strong> {t.immediateEffectDesc}</li>
                    <li>• <strong>{t.within24h}:</strong> {t.within24hEffectDesc}</li>
                    <li>• <strong>{t.noRush}:</strong> {t.noRushEffectDesc}</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-800 mb-2 font-lexend">
                    {t.configureExpertParameters}
                  </h3>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-blue-700 font-arial">
                    <li>• <strong>{t.temperature}:</strong> {t.temperatureDesc}</li>
                    <li>• <strong>{t.waterHardness}:</strong> {t.waterHardnessDesc}</li>
                    <li>• <strong>{t.fertilizerPurity}:</strong> {t.fertilizerPurityDesc}</li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="text-[min(10vw, 70px)] font-semibold text-blue-800 mb-2 font-lexend">
                    {t.selectAvailableFertilizers}
                  </h3>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-blue-700 font-arial">
                    <li>• {t.markAvailableFertilizers}</li>
                    <li>• {t.specifyQuantities}</li>
                    <li>• {t.systemOptimizes}</li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-lime-600 to-lime-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  5
                </div>
                <div>
                  <h3 className="text-[min(10vw, 70px)] font-semibold text-lime-800 mb-2 font-lexend">
                    {t.getResultsAndJarTest}
                  </h3>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-lime-700 font-arial">
                    <li>• {t.clickCalculate}</li>
                    <li>• {t.performJarTest}</li>
                    <li>• {t.followSafetyInstructions}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Protocols */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-300 rounded-xl p-6 shadow-lg">
            <h2 className="text-[min(10vw, 70px)] font-semibold text-red-800 mb-4 flex items-center gap-2 font-lexend">
              <Shield className="text-red-600" size={24} />
              {t.safetyProtocolsDetailed}
            </h2>

            {/* Personal Protection */}
            <div className="mb-6">
              <h3 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-3 flex items-center gap-2 font-lexend">
                <AlertTriangle size={20} />
                {t.personalProtection}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-red-200 shadow-inner">
                  <h4 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-2 font-lexend">{t.mandatory}</h4>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-red-600 font-arial">
                    <li>• {t.protectiveGlasses}</li>
                    <li>• {t.chemicalGloves}</li>
                    <li>• {t.respirator}</li>
                    <li>• {t.protectiveClothing}</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-red-200 shadow-inner">
                  <h4 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-2 font-lexend">{t.forbidden}</h4>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-red-600 font-arial">
                    <li>• {t.noEatingDrinking}</li>
                    <li>• {t.noTouchingFace}</li>
                    <li>• {t.noWorkWithoutVentilation}</li>
                    <li>• {t.noMixingWithAlkalis}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Storage and Handling */}
            <div className="mb-6">
              <h3 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-3">
                {t.storageAndHandling}
              </h3>
              <div className="bg-white p-4 rounded border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-2">{t.storage}</h4>
                    <ul className="space-y-1 text-[min(10vw, 70px)] text-red-600">
                      <li>• {t.dryCoolPlace}</li>
                      <li>• {t.separateFromAlkalis}</li>
                      <li>• {t.sealedContainer}</li>
                      <li>• {t.labeling}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-2">{t.transportation}</h4>
                    <ul className="space-y-1 text-[min(10vw, 70px)] text-red-600">
                      <li>• {t.stableContainer}</li>
                      <li>• {t.avoidImpacts}</li>
                      <li>• {t.safetyDocuments}</li>
                      <li>• {t.emergencyPlan}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-2">{t.disposal}</h4>
                    <ul className="space-y-1 text-[min(10vw, 70px)] text-red-600">
                      <li>• {t.environmentalRequirements}</li>
                      <li>• {t.noSewerage}</li>
                      <li>• {t.neutralizeBeforeDisposal}</li>
                      <li>• {t.consultEcologists}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Procedures */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h3 className="text-[min(10vw, 70px)] font-semibold text-yellow-800 mb-3">
                {t.emergencyProcedures}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[min(10vw, 70px)]">
                <div>
                  <h4 className="text-[min(10vw, 70px)] font-semibold text-yellow-700 mb-2">{t.skinContact}</h4>
                  <ol className="space-y-1 text-[min(10vw, 70px)] text-yellow-700 list-decimal list-inside">
                    <li>{t.rinseWithWater}</li>
                    <li>{t.removeContaminatedClothing}</li>
                    <li>{t.rinse15to20Minutes}</li>
                    <li>{t.seeDoctor}</li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-[min(10vw, 70px)] font-semibold text-yellow-700 mb-2">{t.eyeContact}</h4>
                  <ol className="space-y-1 text-[min(10vw, 70px)] text-yellow-700 list-decimal list-inside">
                    <li>{t.rinseWithCleanWater}</li>
                    <li>{t.keepEyelidsOpen}</li>
                    <li>{t.rinseMinimum15Minutes}</li>
                    <li>{t.immediatelySeeDoctorCaps}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jar-Test Protocol */}
      {activeTab === 'jartest' && (
        <div className="space-y-6">
          <div className="gradient-lime-white border border-lime-300 rounded-xl p-6 shadow-lg">
            <h2 className="text-[min(10vw, 70px)] font-semibold text-lime-800 mb-4 flex items-center gap-2 font-lexend">
              <Beaker className="text-lime-600" size={24} />
              {t.jarTestProtocolDetailed}
            </h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
              <p className="text-[min(10vw, 70px)] text-yellow-800 font-medium">
                <AlertTriangle className="inline mr-2" size={16} />
                {t.mandatoryJarTest}
              </p>
            </div>

            {/* Equipment Needed */}
            <div className="mb-6">
              <h3 className="text-[min(10vw, 70px)] font-semibold text-green-700 mb-3">
                {t.equipmentNeeded}
              </h3>
              <div className="bg-white p-4 rounded border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-green-700">
                    <li>• {t.glassJars}</li>
                    <li>• {t.phMeterOrStrips}</li>
                    <li>• {t.preciseScale}</li>
                    <li>• {t.measuringCylinders}</li>
                  </ul>
                  <ul className="space-y-1 text-[min(10vw, 70px)] text-green-700">
                    <li>• {t.glassStirringRods}</li>
                    <li>• {t.stopwatch}</li>
                    <li>• {t.marker}</li>
                    <li>• {t.logbook}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step-by-step procedure */}
            <div className="space-y-4">
              <h3 className="text-[min(10vw, 70px)] font-semibold text-green-700 mb-3">
                {t.stepByStepProcedure}
              </h3>

              {[
                {
                  step: 1,
                  title: t.samplePreparation,
                  content: t.samplePreparationDesc
                },
                {
                  step: 2,
                  title: t.measureInitialPH,
                  content: t.measureInitialPHDesc
                },
                {
                  step: 3,
                  title: t.calculateTestDoses,
                  content: t.calculateTestDosesDesc
                },
                {
                  step: 4,
                  title: t.addFertilizers,
                  content: t.addFertilizersDesc
                },
                {
                  step: 5,
                  title: t.mixing,
                  content: t.mixingDesc
                },
                {
                  step: 6,
                  title: t.observation,
                  content: t.observationDesc
                },
                {
                  step: 7,
                  title: t.measurePH,
                  content: t.measurePHDesc
                },
                {
                  step: 8,
                  title: t.evaluateResults,
                  content: t.evaluateResultsDesc
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-[min(10vw, 70px)] font-semibold text-green-800 mb-1">{item.title}</h4>
                    <p className="text-[min(10vw, 70px)] text-green-700">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interpretation */}
            <div className="mt-6 bg-white p-4 rounded border">
              <h3 className="text-[min(10vw, 70px)] font-semibold text-green-700 mb-3">
                {t.resultInterpretation}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
                  <h4 className="text-[min(10vw, 70px)] font-semibold text-green-700 mb-1">{t.good}</h4>
                  <p className="text-[min(10vw, 70px)] text-green-600">
                    {t.goodDesc}
                  </p>
                </div>
                <div className="text-center">
                  <Clock className="text-yellow-600 mx-auto mb-2" size={24} />
                  <h4 className="text-[min(10vw, 70px)] font-semibold text-yellow-700 mb-1">{t.caution}</h4>
                  <p className="text-[min(10vw, 70px)] text-yellow-600">
                    {t.cautionDesc}
                  </p>
                </div>
                <div className="text-center">
                  <AlertTriangle className="text-red-600 mx-auto mb-2" size={24} />
                  <h4 className="text-[min(10vw, 70px)] font-semibold text-red-700 mb-1">{t.bad}</h4>
                  <p className="text-[min(10vw, 70px)] text-red-600">
                    {t.badDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default InstructionsSection;