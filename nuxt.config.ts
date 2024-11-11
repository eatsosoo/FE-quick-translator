// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    vite:{
      define:{
        VITE_BASE_URL:  process.env.VITE_BASE_URL
      }
    },
    public: {
      apiBase: process.env.NUXT_API ?? '',
      ...process.env
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@pinia/nuxt'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  // ssr: false,
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})