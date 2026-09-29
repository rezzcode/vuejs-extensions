import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browsers = ['chrome', 'firefox'];

browsers.forEach((browser) => {
  const srcPath = resolve(__dirname, '../dist/temp/content.iife.js');
  const destDir = resolve(__dirname, `../dist/${browser}/src`);
  const destPath = resolve(destDir, 'content.js');

  if (!existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    console.error('Make sure to run build:content first');
    process.exit(1);
  }

  mkdirSync(destDir, { recursive: true });
  copyFileSync(srcPath, destPath);
  console.log(`✓ Copied content script to dist/${browser}/src/content.js`);
});
