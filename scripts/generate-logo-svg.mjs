import sharp from 'sharp';
import potrace from 'potrace';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const logoSrc = path.resolve(
  'C:/Users/Sternee/.cursor/projects/d-WORKSPACE-CSL-CSL-Web/assets/c__Users_Sternee_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_20260903_174934-b67f22c0-2efc-4936-9a2b-76612ebff2a7.png'
);
const oldSrc = path.join(root, 'Elements/LOGOS/CSL-C.png');
const logosDir = path.join(root, 'Elements/LOGOS');
const publicDir = path.join(root, 'public');

async function traceToSvg(input, output, opts = {}) {
  const tmpPng = output.replace('.svg', '-trace.png');

  let pipeline = sharp(input).resize(1024, 1024, {
    fit: 'contain',
    background: opts.bgColor || { r: 255, g: 255, b: 255, alpha: 1 },
  });

  if (opts.extractBlueOnly) {
    pipeline = pipeline
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(async ({ data, info }) => {
        const pixels = Buffer.alloc(info.width * info.height);
        for (let i = 0; i < info.width * info.height; i++) {
          const r = data[i * info.channels];
          const g = data[i * info.channels + 1];
          const b = data[i * info.channels + 2];
          const isBlue = b > 100 && b > r + 30 && b > g + 20;
          pixels[i] = isBlue ? 0 : 255;
        }
        return sharp(pixels, {
          raw: { width: info.width, height: info.height, channels: 1 },
        })
          .png()
          .toBuffer();
      });
    const buffer = await pipeline;
    await sharp(buffer).png().toFile(tmpPng);
  } else {
    await pipeline.greyscale().negate().threshold(128).png().toFile(tmpPng);
  }

  return new Promise((resolve, reject) => {
    potrace.trace(
      tmpPng,
      {
        color: opts.color || '#1455B8',
        background: opts.background || 'transparent',
        turdSize: opts.turdSize ?? 2,
        optTolerance: 0.15,
      },
      (err, svg) => {
        fs.unlinkSync(tmpPng);
        if (err) reject(err);
        else {
          fs.writeFileSync(output, svg);
          resolve(output);
        }
      }
    );
  });
}

async function main() {
  fs.mkdirSync(logosDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  await traceToSvg(oldSrc, path.join(logosDir, 'CSL-C.svg'), {
    color: '#1455B8',
    background: 'transparent',
    turdSize: 2,
  });
  console.log('Created Elements/LOGOS/CSL-C.svg');

  await traceToSvg(logoSrc, path.join(publicDir, 'favicon.svg'), {
    color: '#1455B8',
    background: '#FCFAF5',
    bgColor: { r: 252, g: 250, b: 245, alpha: 1 },
    turdSize: 8,
  });
  console.log('Created public/favicon.svg');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
