import path from 'path';
import checker from 'vite-plugin-checker';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------

const PORT = 3000;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // base: env.VITE_BASE_PATH,
    define: {
      'process.env': env,
    },
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        },
        overlay: {
          position: 'tl',
          initialIsOpen: false,
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1'),
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1'),
        },
      ],
    },
    server: { port: PORT, host: true },
    preview: { port: PORT, host: true },
  }
});
