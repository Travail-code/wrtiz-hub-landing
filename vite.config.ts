import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePlugin } from '@tanstack/router-plugin'

export default defineConfig({
  plugins: [
    vitePlugin(),
    react(),
  ],
})
