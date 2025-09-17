// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],

  app: {
    head: {
      title: 'Nuxt 4 Template - Swiss Style',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A comprehensive finance viewer application' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    baseURL: '/nuxt4-template-swiss-style/', // Change this to your desired subfolder name
    buildAssetsDir: '/_nuxt/', // Keep assets in _nuxt folder
    cdnURL: '' // Leave empty for relative paths
  },
  runtimeConfig: {
    public: {
      mediaBasePath: `${process.env.NUXT_APP_BASE_URL || '/nuxt4-template-swiss-style/'}media/`
    }
  },

  css: [
    'mouse-follower/dist/mouse-follower.min.css',
    '~/assets/css/main.css',
    '~/assets/css/forms.css',
    '~/assets/css/components.css',
    '~/assets/css/navigation.css',
    '~/assets/css/tables.css',
    '~/assets/css/layout.css',
    '~/assets/css/mouse-follower.css',
    '~/assets/css/ui-extensions.css',
    '~/assets/css/animations.css'
  ],

  components: [
    {
      path: '~/components'
    }
  ],

  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' }
    ],
    debug: false
  },
})
