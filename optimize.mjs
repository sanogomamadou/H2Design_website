import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, 'img');
const outDir = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function optimizeMedia() {
  const files = fs.readdirSync(imgDir);
  let imgCount = 1;
  let vidCount = 1;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const inputPath = path.join(imgDir, file);

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const outputPath = path.join(outDir, `opt_img_${imgCount}.webp`);
      console.log(`Optimizing image: ${file} -> opt_img_${imgCount}.webp`);
      
      try {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        imgCount++;
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    } else if (['.mp4', '.webm'].includes(ext)) {
      const outputPath = path.join(outDir, `opt_video_${vidCount}.mp4`);
      console.log(`Copying video: ${file} -> opt_video_${vidCount}.mp4`);
      fs.copyFileSync(inputPath, outputPath);
      vidCount++;
    }
  }

  console.log('Media optimization complete.');
}

optimizeMedia();
