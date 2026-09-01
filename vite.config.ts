import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePlugin as router } from '@tanstack/router-plugin'

export default defineConfig({
  plugins: [
    router(),
    react(),
  ],
})
