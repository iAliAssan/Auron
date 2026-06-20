'use client';

import { useEffect } from 'react';

export function Tracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const res = await fetch('/api/track');
        const serverData = await res.json();

        const clientData = {
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          colorDepth: window.screen.colorDepth,
          language: navigator.language,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          deviceMemory: (navigator as any).deviceMemory,
          hardwareConcurrency: navigator.hardwareConcurrency,
          referrer: document.referrer,
          page: window.location.pathname,
          fcp: 0,
          lcp: 0,
        };

        if (typeof performance !== 'undefined') {
          const entries = performance.getEntriesByType('paint');
          const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');
          if (fcpEntry) clientData.fcp = fcpEntry.startTime;
          
          const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
          if (lcpEntries.length > 0) clientData.lcp = lcpEntries[0].startTime;
        }

        await fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...serverData,
            ...clientData,
          }),
        });

        console.log('✅ Visitor tracked successfully');
      } catch (error) {
        console.error('❌ Tracking error:', error);
      }
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        trackVisit();
      } else {
        window.addEventListener('load', trackVisit);
        return () => window.removeEventListener('load', trackVisit);
      }
    }
  }, []);

  return null;
}
