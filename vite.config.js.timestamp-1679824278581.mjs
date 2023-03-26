// vite.config.js
import react from "file:///C:/scaling_ethereum/polybase-integration/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///C:/scaling_ethereum/polybase-integration/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Pass3Manager",
  version: "1.0.0",
  icons: {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  action: { default_popup: "index.html" },
  content_scripts: [
    {
      matches: [
        "<all_urls>"
      ],
      js: ["content.js"],
      run_at: "document_start"
    }
  ],
  permissions: [
    "tabs",
    "activeTab",
    "storage",
    "scripting"
  ],
  background: {
    service_worker: "background.js"
  },
  host_permissions: [
    "*://*/*"
  ]
};

// vite.config.js
import { nodePolyfills } from "file:///C:/scaling_ethereum/polybase-integration/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = {
  plugins: [
    react(),
    crx({ manifest: manifest_default }),
    nodePolyfills({
      protocolImports: false
    })
  ]
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHNjYWxpbmdfZXRoZXJldW1cXFxccG9seWJhc2UtaW50ZWdyYXRpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHNjYWxpbmdfZXRoZXJldW1cXFxccG9seWJhc2UtaW50ZWdyYXRpb25cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3NjYWxpbmdfZXRoZXJldW0vcG9seWJhc2UtaW50ZWdyYXRpb24vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB7IGNyeCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcclxuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0Lmpzb25cIjtcclxuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcngoeyBtYW5pZmVzdCB9KSxcclxuICAgIG5vZGVQb2x5ZmlsbHMoe1xyXG4gICAgICBwcm90b2NvbEltcG9ydHM6IGZhbHNlLFxyXG4gICAgfSksXHJcbiAgXSxcclxufTtcclxuIiwgIntcclxuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICBcIm5hbWVcIjogXCJQYXNzM01hbmFnZXJcIixcclxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxyXG4gIFwiaWNvbnNcIjoge1xyXG4gICAgXCIxNlwiOiBcImljb24ucG5nXCIsXHJcbiAgICBcIjQ4XCI6IFwiaWNvbi5wbmdcIixcclxuICAgIFwiMTI4XCI6IFwiaWNvbi5wbmdcIlxyXG4gIH0sXHJcbiAgXCJhY3Rpb25cIjogeyBcImRlZmF1bHRfcG9wdXBcIjogXCJpbmRleC5odG1sXCIgfSxcclxuIFxyXG5cclxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXHJcbiAgICAgICAgXCI8YWxsX3VybHM+XCJcclxuICAgICAgXSxcclxuICAgICAgXCJqc1wiOiBbXCJjb250ZW50LmpzXCJdLFxyXG4gICAgICBcInJ1bl9hdFwiOiBcImRvY3VtZW50X3N0YXJ0XCJcclxuICAgIH1cclxuICBdLFxyXG4gIFxyXG4gICAgXCJwZXJtaXNzaW9uc1wiOiBbXHJcbiAgICAgIFwidGFic1wiLFxyXG4gICAgICBcImFjdGl2ZVRhYlwiLFxyXG4gICAgICBcInN0b3JhZ2VcIixcclxuICAgICAgXCJzY3JpcHRpbmdcIlxyXG4gICAgXSxcclxuICAgIFwiYmFja2dyb3VuZFwiOiB7XHJcbiAgICAgIFwic2VydmljZV93b3JrZXJcIjogXCJiYWNrZ3JvdW5kLmpzXCJcclxuICAgIH0sXHJcbiAgICBcImhvc3RfcGVybWlzc2lvbnNcIjogW1xyXG4gICAgICBcIio6Ly8qLypcIlxyXG4gICAgXVxyXG4gIFxyXG4gIFxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVCxPQUFPLFdBQVc7QUFDbFUsU0FBUyxXQUFXOzs7QUNEcEI7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLE9BQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFVLEVBQUUsZUFBaUIsYUFBYTtBQUFBLEVBRzFDLGlCQUFtQjtBQUFBLElBQ2pCO0FBQUEsTUFDRSxTQUFXO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLElBQU0sQ0FBQyxZQUFZO0FBQUEsTUFDbkIsUUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFFRSxhQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQWM7QUFBQSxJQUNaLGdCQUFrQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQSxrQkFBb0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7QUFHSjs7O0FEakNBLFNBQVMscUJBQXFCO0FBRTlCLElBQU8sc0JBQVE7QUFBQSxFQUNiLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUksRUFBRSwyQkFBUyxDQUFDO0FBQUEsSUFDaEIsY0FBYztBQUFBLE1BQ1osaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
