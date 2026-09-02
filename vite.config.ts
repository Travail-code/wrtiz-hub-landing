import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'

// On Vercel, build with the Nitro `vercel` preset so the app is emitted as a
// Build Output API v3 directory (.vercel/output) that Vercel serves natively.
// Everywhere else keep the default node-server output (.output).
const isVercel = !!process.env['VERCEL']

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      customViteReactPlugin: true,
      ...(isVercel ? { target: 'vercel' as const } : {}),
    }),
    viteReact(),
  ],
})
