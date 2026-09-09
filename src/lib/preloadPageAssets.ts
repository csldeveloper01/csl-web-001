// @ts-expect-error — Vite asset import
import heroAboutVisual from '../../Elements/ABOUT/AI INNOVATION.png';
// @ts-expect-error — Vite asset import
import iconBanner from '../../Elements/COURSES/AI + Cloud + AWS = Future Skills.png';
// @ts-expect-error — Vite asset import
import heroServicesVisual from '../../Elements/SERVICES/SERVICES.png';
// @ts-expect-error — Vite asset import
import heroStandaloneVisual from '../../Elements/INTERNSHIPS/INTERNSHIPS - Standalone.png';
// @ts-expect-error — Vite asset import
import comingSoonImage from '../../Elements/STUDENT PORTAL/Coming Soon.png';
// @ts-expect-error — Vite asset import
import notFoundImage from '../../Elements/404/404.png';

const PAGE_CRITICAL_ASSETS: Record<string, string[]> = {
  '/about': [heroAboutVisual],
  '/courses': [iconBanner],
  '/workshops': [iconBanner],
  '/services': [heroServicesVisual],
  '/internships': [heroStandaloneVisual],
  '/student-portal': [comingSoonImage],
  '404': [notFoundImage],
};

const preloadedCache = new Set<string>();

function preloadSingleAsset(src: string): Promise<void> {
  if (preloadedCache.has(src)) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      preloadedCache.add(src);
      if ('decode' in img) {
        img.decode().then(() => resolve()).catch(() => resolve());
      } else {
        resolve();
      }
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function preloadPageAssets(path: string): Promise<void> {
  const assets = PAGE_CRITICAL_ASSETS[path] || [];
  if (assets.length === 0) {
    return Promise.resolve();
  }
  return Promise.all(assets.map(preloadSingleAsset)).then(() => undefined);
}
