import React, { useEffect, useState } from 'react';
import { CheckCircle2, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [offlineReadyToast, setOfflineReadyToast] = useState(false);

  useEffect(() => {
    const handleOfflineReady = () => {
      setOfflineReadyToast(true);
    };
    window.addEventListener('pwa-offline-ready', handleOfflineReady);
    return () => {
      window.removeEventListener('pwa-offline-ready', handleOfflineReady);
    };
  }, []);

  useEffect(() => {
    if (!offlineReadyToast) return;
    const timer = window.setTimeout(() => setOfflineReadyToast(false), 5000);
    return () => window.clearTimeout(timer);
  }, [offlineReadyToast]);

  if (!isOnline) {
    return (
      <div
        role="status"
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-md bg-amber-700 px-3.5 py-2 text-xs font-medium text-white shadow-lg"
      >
        <WifiOff className="w-3.5 h-3.5 shrink-0" />
        <span>Offline Mode — Changes are saved locally and Word export works offline.</span>
      </div>
    );
  }

  if (offlineReadyToast) {
    return (
      <div
        role="status"
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-md bg-[#0F2942] px-3.5 py-2 text-xs font-medium text-white shadow-lg"
      >
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
        <span>App cached for offline use.</span>
      </div>
    );
  }

  return null;
};
