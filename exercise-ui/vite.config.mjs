import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    loglevel: 'debug',
    base: '/',
    plugins: [react()],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    build: {
        manifest: true,
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 8000  
        port: 8000,
        proxy: {
          '/api/exercises': {
              target: 'http://localhost:8080',
              changeOrigin: true,
          }
    },
}})