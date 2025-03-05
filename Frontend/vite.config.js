import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{//isse frontend end backend ek hi port pr chlenge
    port:3001,//frontend port
    proxy:{
      "/api":{
        target:"http://localhost:3000",//backend url
        changeOrigin:true,
      }
    }
  }
})
