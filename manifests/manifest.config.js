import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
const packageJsonPath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version || '1.0.0';

// Base configuration shared between browsers
const baseManifest = {
  name: 'Vue.js Web Extension Template',
  version,
  manifest_version: 3,
  description: 'A modern, modular template for building Web Extensions with Vue 3, Vite, and TypeScript',
  action: {
    default_title: 'Vue.js Web Extension',
    default_popup: 'popup.html',
    /**
     * @description These are the default icons for the extension action (toolbar button)
     * Notes: You can change these depending on your icon names and sizes.
     * Example: if your icon naming convension is icon-16.png, icon-32.png, etc..
     * then you can leave this as is. Though if your naming is different, eg icon16.png or 16.png,
     * then you will need to change the icon paths accordingly.
     * 
     * For editing, check also line 48 or the additional `icon` section.
     */
    default_icon: {
      '16': 'icon/icon-16.png',
      '32': 'icon/icon-32.png',
      '48': 'icon/icon-48.png',
      '128': 'icon/icon-128.png',
    },
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content.js'],
      run_at: 'document_idle',
      all_frames: false,
    },
  ],
  permissions: ['storage', 'activeTab', 'tabs', 'sidePanel'],
  host_permissions: ['<all_urls>'],
  icons: {
    '16': 'icon/icon-16.png',
    '32': 'icon/icon-32.png',
    '48': 'icon/icon-48.png',
    '128': 'icon/icon-128.png',
  },
  web_accessible_resources: [
    {
      resources: [
        'extension_page.html',
        'side_panel.html',
        'popup.html',
        'assets/*',
      ],
      matches: ['<all_urls>'],
    },
  ],
  options_ui: {
    page: 'extension_page.html',
    open_in_tab: true,
  },
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'; style-src 'self' 'unsafe-inline';",
  },
};

export default baseManifest;
