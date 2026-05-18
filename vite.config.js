import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Expose le serveur sur le réseau Wi-Fi local (0.0.0.0)
    port: 8400, // Port par défaut du projet
  }
});
