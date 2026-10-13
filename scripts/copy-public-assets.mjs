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
  // {
  //   src: path.join(root, 'Elements/VIDEO ASSETS/C_Loading_Animation.gif'),
  //   dest: path.join(root, 'public/assets/c-loading-animation.gif'),
  // },
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

// Copy internship video assets and posters if available
const videoSrcDir = path.join(root, 'Elements/VIDEO ASSETS/INTERNSHIPS');
const posterSrcDir = path.join(videoSrcDir, 'posters');
const videoDestDir = path.join(root, 'public/internships/videos');
const posterDestDir = path.join(root, 'public/internships/posters');

if (fs.existsSync(videoSrcDir)) {
  fs.mkdirSync(videoDestDir, { recursive: true });
  fs.mkdirSync(posterDestDir, { recursive: true });
  const vFiles = fs.readdirSync(videoSrcDir).filter(f => f.endsWith('.mp4')).sort();
  vFiles.forEach((f, idx) => {
    const i = idx + 1;
    const vSrc = path.join(videoSrcDir, f);
    const vDest = path.join(videoDestDir, `video_${i}.mp4`);
    if (!fs.existsSync(vDest) || fs.statSync(vDest).size !== fs.statSync(vSrc).size) {
      fs.copyFileSync(vSrc, vDest);
      console.log(`[copy-public-assets] Copied ${f} → video_${i}.mp4`);
    }
    const pSrc = path.join(posterSrcDir, `poster_${i}.jpg`);
    const pDest = path.join(posterDestDir, `poster_${i}.jpg`);
    if (fs.existsSync(pSrc) && (!fs.existsSync(pDest) || fs.statSync(pDest).size !== fs.statSync(pSrc).size)) {
      fs.copyFileSync(pSrc, pDest);
      console.log(`[copy-public-assets] Copied poster_${i}.jpg`);
    }
  });
}

// Copy workshop video assets and posters if available
const workshopWebDir = path.join(root, 'Elements/VIDEO ASSETS/WORKSHOPS/web');
const workshopVideoDestDir = path.join(root, 'public/workshops/videos');
const workshopPosterDestDir = path.join(root, 'public/workshops/posters');

if (fs.existsSync(workshopWebDir)) {
  fs.mkdirSync(workshopVideoDestDir, { recursive: true });
  fs.mkdirSync(workshopPosterDestDir, { recursive: true });

  const wVideos = path.join(workshopWebDir, 'videos');
  if (fs.existsSync(wVideos)) {
    fs.readdirSync(wVideos).forEach((file) => {
      const srcFile = path.join(wVideos, file);
      const destFile = path.join(workshopVideoDestDir, file);
      if (!fs.existsSync(destFile) || fs.statSync(destFile).size !== fs.statSync(srcFile).size) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`[copy-public-assets] Copied workshop video: ${file}`);
      }
    });
  }

  const wPosters = path.join(workshopWebDir, 'posters');
  if (fs.existsSync(wPosters)) {
    fs.readdirSync(wPosters).forEach((file) => {
      const srcFile = path.join(wPosters, file);
      const destFile = path.join(workshopPosterDestDir, file);
      if (!fs.existsSync(destFile) || fs.statSync(destFile).size !== fs.statSync(srcFile).size) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`[copy-public-assets] Copied workshop poster: ${file}`);
      }
    });
  }
}


