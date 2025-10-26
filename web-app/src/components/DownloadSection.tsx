import React, { useEffect, useRef } from 'react';
import { Download, Smartphone, Shield, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';
import { useTranslation } from '../hooks/useTranslation';

const DownloadSection: React.FC = () => {
  const { t } = useTranslation();
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (qrCanvasRef.current) {
        try {
          // Generate QR code for the APK download URL
          const downloadUrl = `${window.location.origin}/app-debug.apk`;
          await QRCode.toCanvas(qrCanvasRef.current, downloadUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: '#1e40af', // Blue color to match the theme
              light: '#ffffff'
            }
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQRCode();
  }, []);

  const handleDownloadAPK = () => {
    const link = document.createElement('a');
    link.href = '/aquatune.apk';
    link.download = 'aquatune-aquatune.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
        <div className="absolute top-0 -right-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-300/40 dark:from-emerald-800/20 dark:to-teal-700/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/40 dark:from-blue-800/20 dark:to-indigo-700/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Smartphone className="w-12 h-12 text-blue-600" />
            <h1 className="text-[min(6vw, 48px)] font-bold text-slate-900 font-lexend">
              {t.downloadTitle}
            </h1>
          </div>
          <p className="text-[min(4vw, 20px)] text-slate-600 max-w-3xl mx-auto font-arial">
            {t.downloadDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Download Button and QR Code */}
          <div className="gradient-lime-blue border border-blue-300 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-[min(5vw, 28px)] font-semibold text-blue-700 mb-6 font-lexend">
                {t.downloadApkButton}
              </h2>

              {/* Download Button */}
              <button
                onClick={handleDownloadAPK}
                className="btn-primary mb-8 flex items-center justify-center gap-3 mx-auto text-[min(4vw, 18px)] px-8 py-4 animate-bounce"
              >
                <Download className="w-6 h-6" />
                <span className="font-lexend">{t.downloadApkButton}</span>
              </button>

              {/* QR Code */}
              <div className="bg-white p-4 rounded-lg shadow-inner inline-block">
                <h3 className="text-[min(3vw, 16px)] font-medium text-slate-700 mb-3 font-lexend">
                  {t.downloadQrTitle}
                </h3>
                <canvas
                  ref={qrCanvasRef}
                  className="mx-auto border border-gray-200 rounded"
                />
              </div>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="gradient-lime-blue border border-blue-300 rounded-xl p-8 shadow-lg">
            <h2 className="text-[min(5vw, 28px)] font-semibold text-blue-700 mb-6 font-lexend flex items-center gap-2">
              <Shield className="w-7 h-7" />
              {t.downloadInstructions}
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[min(3vw, 16px)] text-slate-700 font-arial">
                  {t.downloadStep1}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[min(3vw, 16px)] text-slate-700 font-arial">
                  {t.downloadStep2}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[min(3vw, 16px)] text-slate-700 font-arial">
                  {t.downloadStep3}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[min(3vw, 16px)] text-slate-700 font-arial">
                  {t.downloadStep4}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Offline Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[min(3.5vw, 18px)] font-semibold text-green-800 mb-2 font-lexend">
                  {t.downloadNote.split(':')[0]}:
                </h3>
                <p className="text-[min(3vw, 14px)] text-green-700 font-arial">
                  {t.downloadNote.split(':')[1]}
                </p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[min(3.5vw, 18px)] font-semibold text-amber-800 mb-2 font-lexend">
                  {t.downloadSecurity.split(':')[0]}:
                </h3>
                <p className="text-[min(3vw, 14px)] text-amber-700 font-arial">
                  {t.downloadSecurity.split(':')[1]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility */}
        <div className="mt-8 text-center">
          <p className="text-[min(3vw, 14px)] text-slate-500 font-arial">
            {t.downloadCompatibility}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;