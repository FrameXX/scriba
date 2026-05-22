import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon_light.svg",
        "favicon_dark.svg",
        "favicon_light_512.png",
        "favicon_dark_512.png",
      ],
      manifest: {
        name: "Scriba",
        short_name: "Scriba",
        description: "Simple AsciiDoc editor",
        theme_color: "#378fe7",
        background_color: "#1a1a1a",
        display: "standalone",
        icons: [
          {
            src: "favicon_light_512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "favicon_light_32.png",
            sizes: "32x32",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    assetsInlineLimit: 0,
  },
});
