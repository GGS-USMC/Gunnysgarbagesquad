import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function suppressHmrErrorPlugin(): Plugin {
  return {
    name: 'suppress-hmr-error',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          {
            tag: 'script',
            children: `
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && (
                  event.reason.message?.includes('WebSocket') ||
                  event.reason.message?.includes('vite') ||
                  event.reason.stack?.includes('@vite/client')
                )) {
                  event.preventDefault();
                }
              });
              window.addEventListener('error', function(event) {
                if (
                  event.message?.includes('WebSocket') ||
                  event.filename?.includes('@vite/client')
                ) {
                  event.preventDefault();
                }
              });
            `,
            injectTo: 'head-prepend',
          },
        ];
      },
    },
  };
}

export default defineConfig({
  plugins: [suppressHmrErrorPlugin(), react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
