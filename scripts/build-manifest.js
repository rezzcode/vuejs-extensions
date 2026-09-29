import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import chromeManifest from '../manifests/manifest.config.chrome.js';
import firefoxManifest from '../manifests/manifest.config.firefox.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const chromeDir = join(__dirname, '../dist/chrome');
const firefoxDir = join(__dirname, '../dist/firefox');

try {
  mkdirSync(chromeDir, { recursive: true });
  mkdirSync(firefoxDir, { recursive: true });

  writeFileSync(
    join(chromeDir, 'manifest.json'),
    JSON.stringify(chromeManifest, null, 2),
    'utf-8'
  );
  console.log('✓ Chrome manifest generated');

  writeFileSync(
    join(firefoxDir, 'manifest.json'),
    JSON.stringify(firefoxManifest, null, 2),
    'utf-8'
  );
  console.log('✓ Firefox manifest generated');
} catch (error) {
  console.error('Error generating manifests:', error);
  process.exit(1);
}
