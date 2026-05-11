import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // Serve parent assests/ folder as public directory
  publicDir: path.resolve(__dirname, './assests'),
  server: {
    host: '0.0.0.0',
    port: 5173,
    fs: { allow: ['..'] }
  },
})
