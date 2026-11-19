import React, { useState } from 'react';
import { MonitorDown, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isMacSafari, install } =
    usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) return;
      return;
    }
    setShowGuide(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-[#0F2942] bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F2942]"
      >
        <MonitorDown className="w-4 h-4 shrink-0" />
        <span className="sm:hidden">Install</span>
        <span className="hidden sm:inline">Install App</span>
      </button>

      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
        >
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="pwa-install-dialog-title"
                  className="text-base font-semibold text-slate-900"
                >
                  Install Audit Working Paper Pro
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Run offline as a dedicated desktop or mobile application
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Close install instructions"
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {isIOS ? (
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Tap the <strong>Share</strong> button in Safari&apos;s toolbar.
                  </li>
                  <li>
                    Scroll down and select <strong>Add to Home Screen</strong>.
                  </li>
                  <li>
                    Tap <strong>Add</strong> to launch Audit Working Paper Pro from
                    your home screen.
                  </li>
                </ol>
              ) : isMacSafari ? (
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Open the <strong>File</strong> menu in Safari on macOS (or click
                    the Share button in the toolbar).
                  </li>
                  <li>
                    Select <strong>Add to Dock</strong>.
                  </li>
                  <li>
                    Click <strong>Add</strong> to install it as a standalone macOS app.
                  </li>
                </ol>
              ) : (
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Windows / macOS (Chrome or Edge):</strong> Click the{' '}
                    <strong>Install</strong> icon in the browser address bar, or open
                    the browser menu and select{' '}
                    <strong>Install Audit Working Paper Pro</strong>.
                  </li>
                  <li>
                    <strong>Android (Chrome):</strong> Tap the browser menu{' '}
                    <strong>(&#8942;)</strong> and choose{' '}
                    <strong>Install app</strong> or{' '}
                    <strong>Add to Home screen</strong>.
                  </li>
                  <li>
                    <strong>iOS / iPadOS (Safari):</strong> Tap{' '}
                    <strong>Share</strong> and choose{' '}
                    <strong>Add to Home Screen</strong>.
                  </li>
                </ol>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0F2942] rounded-md hover:bg-[#163859] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
