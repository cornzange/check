import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/check/",
  plugins: [react(), nodePolyfills()],
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ]
    }
  }
})