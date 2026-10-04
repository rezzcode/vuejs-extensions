import baseManifest from './manifest.config.js';

const chromeManifest = {
  ...baseManifest,
  side_panel: {
    default_path: 'side_panel.html',
  },
  background: {
    service_worker: 'src/background.js',
    type: 'module',
  },
};

export default chromeManifest;
