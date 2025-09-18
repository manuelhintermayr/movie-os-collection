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
      title: 'Movie Computer Screens Collection',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A comprehensive collection of computer interfaces from movies (1968-2024) recreated for the web. Features GSAP animations, Swiss Style design, and full internationalization.' },
        { name: 'keywords', content: 'movie computer screens, movie interfaces, web recreation, UI collection, movie tech, film interfaces, sci-fi UI, retro computing, GSAP animations' },
        { name: 'author', content: 'Manuel Hintermayr' },
        { property: 'og:title', content: 'Movie Computer Screens Collection' },
        { property: 'og:description', content: 'A comprehensive collection of computer interfaces from movies (1968-2024) recreated for the web. Features GSAP animations, Swiss Style design, and full internationalization.' },
        { property: 'og:url', content: 'https://projects.manuelhintermayr.com/movie-os-collection' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://projects.manuelhintermayr.com/movie-os-collection' }
      ]
    },
    baseURL: '/movie-os-collection/', // Updated for movie collection project
    buildAssetsDir: '/_nuxt/', // Keep assets in _nuxt folder
    cdnURL: '' // Leave empty for relative paths
  },
  runtimeConfig: {
    public: {
      mediaBasePath: `${process.env.NUXT_APP_BASE_URL || '/movie-os-collection/'}media/`
    }
  },

  css: [
    'mouse-follower/dist/mouse-follower.min.css',
    '~/assets/css/main.css',
    '~/assets/css/forms.css',
    '~/assets/css/mouse-follower.css',
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
