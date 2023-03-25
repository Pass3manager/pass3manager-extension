import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default {
  plugins: [
    react(),
    crx({ manifest }),
    nodePolyfills({
      protocolImports: false,
    }),
  ],
};
