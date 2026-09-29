import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getDevConfig({ target = 'extensionPage', port = 8080, open = true } = {}) {
  const uiRoots = {
    extensionPage: resolve(__dirname, './src/ui/extensionPage'),
    sidePanel: resolve(__dirname, './src/ui/sidePanel'),
    popup: resolve(__dirname, './src/ui/popup'),
  };

  const root = uiRoots[target] || resolve(__dirname, `./src/ui/${target}`);

  return {
    plugins: [vue(), vueJsx()],
    root,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@assets': resolve(__dirname, './src/assets'),
      },
    },
    server: {
      port,
      open,
    },
  };
}

/**
 * @description Default development configuration for serving UI with hot reload
 * @param {Object} options - Configuration options
 * @param {string} options.target - The target UI to serve (extensionPage, sidePanel, or popup)
 * @param {number} options.port - The port to serve the UI on
 * @param {boolean} options.open - Whether to open the UI in the browser
 * @returns {Object} The Vite configuration object
 */
export default defineConfig(() => {
  const target = process.env.TARGET_UI || 'extensionPage';
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
  const open = process.env.OPEN !== 'false';

  return getDevConfig({ target, port, open });
});
