import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browsers = ['chrome', 'firefox'];

// you can add more icon sizes here if needed
const iconSizes = ['16', '32', '48', '64', '128'];

// Create dist directories if none exist
browsers.forEach((browser) => {
  const distPath = join(__dirname, `../dist/${browser}`);
  const iconPath = join(distPath, 'icon');

  if (!existsSync(distPath)) {
    mkdirSync(distPath, { recursive: true });
  }

  if (!existsSync(iconPath)) {
    mkdirSync(iconPath, { recursive: true });
  }

  // Copy icon files, checking for either 16.png or icon-16.png
  iconSizes.forEach((size) => {
    const candidate1 = join(__dirname, `../public/icon/${size}.png`);
    const candidate2 = join(__dirname, `../public/icon/icon-${size}.png`);

    const sourceIcon = existsSync(candidate1)
      ? candidate1
      : existsSync(candidate2)
        ? candidate2
        : null;

    if (sourceIcon) {
      copyFileSync(sourceIcon, join(iconPath, `${size}.png`));
      copyFileSync(sourceIcon, join(iconPath, `icon-${size}.png`));
    } else {
      console.warn(`Warning: Icon for size ${size} not found in public/icon directory`);
    }
  });

  // Also copy main icon.png if it exists
  const mainIcon = join(__dirname, '../public/icon/icon.png');
  if (existsSync(mainIcon)) {
    copyFileSync(mainIcon, join(iconPath, 'icon.png'));
  }
});

console.log('✓ Extension icons copied for Chrome and Firefox');
