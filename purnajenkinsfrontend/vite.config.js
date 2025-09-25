import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite builds assets relative to the frontend WAR context path
export default defineConfig({
  plugins: [react()],
  base: '/purnajenkinsfrontend/',  // matches Tomcat frontend folder
})
