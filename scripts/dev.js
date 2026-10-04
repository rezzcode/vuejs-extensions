/**
 * Description: This is a developer script on how we would be serving the UI for the:
 * extensionPage, sidePanel, and popup with hot reload using Vite.
 * It allows us to run the dev server for each UI component separately or all at once.
 */
import { createServer } from 'vite';
import { getDevConfig } from '../vite.dev.js';

// Parse command line arguments
const args = process.argv.slice(2);
const firstArg = args[0] || 'extensionPage';

// Parse optional --port argument or fallback
function getPortArg(defaultVal) {
  const portIndex = args.indexOf('--port');
  if (portIndex !== -1 && args[portIndex + 1]) {
    return parseInt(args[portIndex + 1], 10);
  }
  if (process.env.PORT) {
    return parseInt(process.env.PORT, 10);
  }
  return defaultVal;
}

const shouldOpen = !args.includes('--no-open') && process.env.OPEN !== 'false';

async function startSingleServer(target, defaultPort) {
  const port = getPortArg(defaultPort);
  const config = getDevConfig({ target, port, open: shouldOpen });

  try {
    const server = await createServer({
      ...config,
      configFile: false,
    });

    await server.listen();
    console.log('\n==================================================');
    console.log(` => Vue Extension Dev Server [${target}] <=`);
    console.log(` => Local:   http://localhost:${port}/`);
    console.log(` => Target:  ./src/ui/${target}`);
    console.log('==================================================\n');

    const handleExit = async () => {
      console.log(`\nStopping dev server [${target}]...`);
      await server.close();
      process.exit(0);
    };

    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
  } catch (err) {
    console.error(`Failed to start dev server for ${target}:`, err);
    process.exit(1);
  }
}

async function startAllServers() {
  const targets = [
    { target: 'extensionPage', port: 8080, title: 'Extension Page' },
    { target: 'sidePanel', port: 8081, title: 'Side Panel' },
    { target: 'popup', port: 8082, title: 'Popup' },
  ];

  console.log('\n==================================================');
  console.log(' => Starting All Vue Web Extension Dev Servers...');
  console.log('==================================================\n');

  const activeServers = [];

  try {
    for (const item of targets) {
      const config = getDevConfig({
        target: item.target,
        port: item.port,
        open: shouldOpen,
      });

      const server = await createServer({
        ...config,
        configFile: false,
      });

      await server.listen();
      activeServers.push({ ...item, server });
    }

    console.log('\n╔══════════════════════════════════════════════════╗');
    console.log('║       Vue.js Web Extension Dev Servers Ready     ║');
    console.log('╚══════════════════════════════════════════════════╝');
    for (const item of activeServers) {
      const padding = ' '.repeat(Math.max(1, 16 - item.title.length));
      console.log(` => ${item.title}:${padding}http://localhost:${item.port}/`);
    }
    console.log('──────────────────────────────────────────────────');
    console.log('Press Ctrl+C to stop all servers.\n');

    const handleExit = async () => {
      console.log('\nStopping all dev servers...');
      for (const item of activeServers) {
        await item.server.close();
      }
      process.exit(0);
    };

    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
  } catch (err) {
    console.error('Failed to start all dev servers:', err);
    for (const item of activeServers) {
      await item.server?.close();
    }
    process.exit(1);
  }
}

if (firstArg === 'all' || firstArg === '--all') {
  startAllServers();
} else if (firstArg === 'sidePanel' || firstArg === 'dev:sidePanel') {
  // When running standalone, default port is 8080 as requested
  startSingleServer('sidePanel', 8080);
} else if (firstArg === 'popup' || firstArg === 'dev:popup') {
  startSingleServer('popup', 8080);
} else {
  // Default: extensionPage on port 8080
  startSingleServer('extensionPage', 8080);
}
