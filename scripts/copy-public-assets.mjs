import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const copies = [
  {
    src: path.join(root, 'Elements/VIDEO ASSETS/Intro 2.mp4'),
    dest: path.join(root, 'public/intro/logo_intro_animation.mp4'),
  },
  {
    src: path.join(root, 'Elements/VIDEO ASSETS/C_Loading_Animation.gif'),
    dest: path.join(root, 'public/assets/c-loading-animation.gif'),
  },
  {
    src: path.join(root, 'Elements/PUBLIC/thumbnail.png'),
    dest: path.join(root, 'public/thumbnail.png'),
  },
  {
    src: path.join(root, 'Elements/LOGOS/CSL-C.png'),
    dest: path.join(root, 'public/assets/csl-c.png'),
  },
];

for (const { src, fallback, dest } of copies) {
  const source = fs.existsSync(src) ? src : fallback && fs.existsSync(fallback) ? fallback : null;
  if (!source) {
    console.warn(`[copy-public-assets] Source not found, skipping: ${src}`);
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(source, dest);
  console.log(`[copy-public-assets] Copied ${path.basename(source)} → ${path.relative(root, dest)}`);
}
