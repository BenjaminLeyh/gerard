import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  return {
    base: '/gerard/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: 'Gérard - Pet Collar App',
          short_name: 'Gérard',
          description: 'Application de suivi pour collier connecté',
          theme_color: '#D4AF37', // Ton gold
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/gerard/',
          start_url: '/gerard/',
          icons: [
            {
              src: '/gerard/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/gerard/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: '/gerard/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 an
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
