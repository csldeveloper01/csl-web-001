import { useEffect, useState } from 'react';

export function useDeepLinkHighlight() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    const handleDeepLink = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      // 1. Wait until page assets & DOM components are fully mounted
      const mountTimer = setTimeout(() => {
        const el = document.getElementById(hash) || document.querySelector(`[data-deep-link-id="${hash}"]`);
        if (el) {
          // 2. Smoothly scroll target into position
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // 3. WAIT until smooth scroll completes (~700ms) before triggering highlight
          const scrollSettleTimer = setTimeout(() => {
            setHighlightedId(hash);

            // 4. Trigger quick 450ms visual confirmation (scale 1 -> 1.04 -> 1 & brighten), then clear
            const animationEndTimer = setTimeout(() => {
              setHighlightedId(null);
            }, 450);

            return () => clearTimeout(animationEndTimer);
          }, 700);

          return () => clearTimeout(scrollSettleTimer);
        }
      }, 250);

      return () => clearTimeout(mountTimer);
    };

    handleDeepLink();
    window.addEventListener('hashchange', handleDeepLink);
    return () => window.removeEventListener('hashchange', handleDeepLink);
  }, []);

  return highlightedId;
}
