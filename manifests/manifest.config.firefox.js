import baseManifest from './manifest.config.js';

const firefoxManifest = {
  ...baseManifest,
  sidebar_action: {
    default_panel: 'side_panel.html',
    default_title: 'Vue.js Web Extension Side Panel',
  },
  background: {
    scripts: ['src/background.js'],
    type: 'module',
  },
  browser_specific_settings: {
    gecko: {
      id: 'vuejs-web-extension-template@example.com',
    },
  },
};

// Firefox uses sidebar_action instead of the Chromium-specific 'sidePanel' permission
firefoxManifest.permissions = (firefoxManifest.permissions || []).filter(
  (p) => p !== 'sidePanel'
);

export default firefoxManifest;