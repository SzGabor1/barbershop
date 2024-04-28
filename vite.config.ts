import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths'; // Updated import statement to use default import syntax
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: 4175,
  },
  plugins: [
    react({
      jsxRuntime: 'classic'
    }),
    viteTsconfigPaths.default(),
    svgrPlugin()
  ],
  build: {
    terserOptions: {
      compress: {
        unused: true,
      }
    }
  }
});
