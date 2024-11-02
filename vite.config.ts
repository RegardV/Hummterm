import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { findAvailablePort } from './server/port-finder.js';
import { config } from './server/config.js';

export default defineConfig(async () => {
  const port = await findAvailablePort(config.defaultVitePort);
  
  return {
    plugins: [react()],
    server: {
      port,
      strictPort: false,
      host: true
    }
  };
});