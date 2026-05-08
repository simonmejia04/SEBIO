import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 4040, host: true, allowedHosts: ["yummy-diary-arming.ngrok-free.dev"] },
})
