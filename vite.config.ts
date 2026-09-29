import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve, dirname } from 'path';
import { copyFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function copyHtmlToRoot() {
  return {
    name: 'copy-html-to-root',
    closeBundle() {
      const browser = process.env.BROWSER || 'chrome';
      const distRoot = resolve(__dirname, `dist/${browser}`);

      const mappings = [
        {
          src: resolve(distRoot, 'src/ui/extensionPage/index.html'),
          dest: resolve(distRoot, 'extension_page.html'),
        },
        {
          src: resolve(distRoot, 'src/ui/sidePanel/index.html'),
          dest: resolve(distRoot, 'side_panel.html'),
        },
        {
          src: resolve(distRoot, 'src/ui/popup/index.html'),
          dest: resolve(distRoot, 'popup.html'),
        },
      ];

      mappings.forEach(({ src, dest }) => {
        if (!existsSync(src)) {
          console.warn(`⚠️ Skipped: source HTML not found: ${src}`);
          return;
        }

        mkdirSync(dirname(dest), { recursive: true });
        copyFileSync(src, dest);
      });

      // Cleanup step — remove /src/ui folder safely
      const uiDir = resolve(distRoot, 'src/ui');
      try {
        rmSync(uiDir, { recursive: true, force: true });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn(`⚠️ Cleanup skipped: ${message}`);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const browser = process.env.BROWSER || 'chrome';
  const isBuild = command === 'build' && mode !== 'test';

  const plugins = [vue(), vueJsx()];
  if (isBuild) {
    plugins.push(copyHtmlToRoot());
  }

  return {
    plugins,
    build: {
      modulePreload: false,
      outDir: `dist/${browser}`,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          background: resolve(__dirname, './src/background/index.ts'),
          side_panel: resolve(__dirname, './src/ui/sidePanel/index.html'),
          extension_page: resolve(__dirname, './src/ui/extensionPage/index.html'),
          popup: resolve(__dirname, './src/ui/popup/index.html'),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'background') return 'src/background.js';
            return 'src/[name].js';
          },
          chunkFileNames: (chunk) => {
            const name = chunk.name.replace('_', 'helper-');
            return `src/${name}.js`;
          },
          assetFileNames: 'assets/[name].[ext]',
          format: 'es',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@assets': resolve(__dirname, './src/assets'),
      },
    },
  };
});
