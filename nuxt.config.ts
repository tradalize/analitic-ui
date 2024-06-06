import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    dbUrl: "",
    arbitrageApiUrl: "",
  },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  vite: {
    plugins: [
      nodePolyfills({
        include: ["crypto"],
      }),
    ],
  },
});
