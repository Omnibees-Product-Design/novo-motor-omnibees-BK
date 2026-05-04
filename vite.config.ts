import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/novo-motor-omnibees-BK/',
  plugins: [react(), tailwindcss()],
  server: { port: 5181 },
})
