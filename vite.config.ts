import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { router } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    router(),
    react(),
  ],
})
