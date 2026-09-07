// @ts-expect-error — Vite asset import
import cslBook from '../../Elements/LOGOS/CSL -BOOK.png';
// @ts-expect-error — Vite asset import
import cslC from '../../Elements/LOGOS/CSL-C.svg';
// @ts-expect-error — Vite asset import
import state1 from '../../Elements/HERO/STATE 1.png';
// @ts-expect-error — Vite asset import
import state2 from '../../Elements/HERO/STATE 2.png';
// @ts-expect-error — Vite asset import
import state3 from '../../Elements/HERO/STATE 3.png';
// @ts-expect-error — Vite asset import
import state4 from '../../Elements/HERO/STATE 4.png';
// @ts-expect-error — Vite asset import
import cslTypography from '../../Elements/LOGOS/CSL-TYPOGRAPHY.png';

const CRITICAL_HOME_ASSETS = [
  cslBook,
  cslC,
  state1,
  state2,
  state3,
  state4,
  cslTypography,
  '/assets/c-loading-animation.gif',
  '/thumbnail.png',
];

let preloadPromise: Promise<void> | null = null;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function preloadHomeAssets(): Promise<void> {
  if (!preloadPromise) {
    preloadPromise = Promise.all(CRITICAL_HOME_ASSETS.map(preloadImage)).then(() => undefined);
  }
  return preloadPromise;
}

export function waitForHomeAssets(): Promise<void> {
  return preloadHomeAssets();
}
