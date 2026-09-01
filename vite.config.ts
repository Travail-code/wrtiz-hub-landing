import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouterPlugin } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouterPlugin(),
    react(),
  ],
})
