// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  colorMode: {
    preference: "dark",
    storageKey: "tradalize-analytic-ui-color-mode",
  },

  runtimeConfig: {
    dbUrl: "",
    arbitrageApiUrl: "",
  },

  modules: ["@nuxt/ui", "shadcn-nuxt"],
  css: ["~/assets/css/tailwind.css"],
  compatibilityDate: "2025-02-10",
});
