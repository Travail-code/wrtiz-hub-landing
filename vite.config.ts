import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import start from '@tanstack/start/vite'

export default defineConfig({
  plugins: [
    start(),
    react(),
  ],
})
