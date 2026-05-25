import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Intha line-ah top-la serthukonga

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Intha keezha irukura single line-ah mattum correct-a add pannunga:
  cacheDir: path.join(process.env.TEMP || '/tmp', 'vite-cache-emp-frontend'),
})
