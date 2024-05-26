// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    dbUrl: "",
    arbitrageApiUrl: "",
  },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
});
