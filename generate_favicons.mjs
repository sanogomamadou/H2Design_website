import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputLogo = path.join(__dirname, 'public', 'assets', 'logo.png');
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(publicDir, 'assets');

async function generate() {
  try {
    // Generate 192x192 favicon.png
    console.log('Generating favicon...');
    await sharp(inputLogo)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(publicDir, 'favicon.png'));
    
    console.log('Generating apple-touch-icon...');
    await sharp(inputLogo)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    // Generate og-image.jpg (1200x630) - with white background if logo is transparent
    console.log('Generating og-image.jpg...');
    await sharp(inputLogo)
      .resize(1200, 630, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .jpeg({ quality: 85 })
      .toFile(path.join(assetsDir, 'og-image.jpg'));

    console.log('Images generated successfully!');
  } catch (e) {
    console.error('Error generating images:', e);
  }
}

generate();
