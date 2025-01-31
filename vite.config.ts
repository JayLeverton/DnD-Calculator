import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://jayleverton.github.io/DnD-Calculator/",
  server: {
    host: "192.168.1.241",
    port: 5173
  }
})
