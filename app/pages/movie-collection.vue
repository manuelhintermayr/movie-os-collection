<template>
  <div id="movie-collection-page" class="relative min-h-screen">
    <LoadingScreen :is-loading="!loadingFinished" />

    <div v-show="!isLoading" class="min-h-screen swiss-grid">
      <!-- Header -->
      <header class="border-b-2 border-current sticky top-0 bg-white dark:bg-gray-900 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <UIcon name="i-heroicons-film" class="w-8 h-8 text-black dark:text-white mr-3" />
              <h1 class="text-3xl font-bold text-black dark:text-white uppercase tracking-wide">
                {{ $t('movieCollection.title') }}
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <LanguageSwitcher />
              <div ref="darkModeButton" data-cursor-pointer>
                <UButton 
                  :icon="colorMode.preference === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                  variant="ghost" 
                  @click="toggleColorMode"
                  :aria-label="colorMode.preference === 'dark' ? $t('header.switchToLight') : $t('header.switchToDark')" 
                />
              </div>
            </div>
          </div>
          
          <!-- Controls -->
          <div class="flex gap-4 items-center pb-6 flex-wrap">
            <UInput 
              v-model="searchQuery" 
              :placeholder="$t('movieCollection.search')" 
              class="flex-1 min-w-72" 
              size="lg"
              icon="i-heroicons-magnifying-glass"
              data-cursor-pointer
            />
            <UButton 
              @click="shuffleItems" 
              color="neutral" 
              variant="outline" 
              size="lg"
              icon="i-heroicons-arrow-path"
              data-cursor-pointer
            >
              {{ $t('movieCollection.shuffle') }}
            </UButton>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          <!-- Section Title -->
          <div class="text-center">
            <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              {{ $t('movieCollection.collection') }}
            </h2>
            <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {{ $t('movieCollection.subtitle') }}
            </p>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard 
              v-for="(item, index) in filteredItems" 
              :key="`${item.title}-${index}`"
              class="card-tilt overflow-hidden" 
              :ui="{ body: { padding: '' } }"
              data-cursor-pointer
            >
              <!-- Image -->
              <div class="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img 
                  :src="item.image || placeholderImage" 
                  :alt="`${item.title} – ${item.film}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  data-cursor="-media"
                />
              </div>

              <!-- Content -->
              <div class="p-6 space-y-4">
                <!-- Title & Film -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ item.film }}
                  </p>
                </div>

                <!-- Description -->
                <p v-if="getLocalizedDescription(item)" class="text-sm text-gray-700 dark:text-gray-300">
                  {{ getLocalizedDescription(item) }}
                </p>

                <!-- Tech Stack -->
                <div v-if="item.stack" class="text-xs text-gray-500 dark:text-gray-400">
                  <strong>{{ $t('movieCollection.stack') }}:</strong> {{ item.stack }}
                </div>

                <!-- Tags -->
                <div v-if="item.tags && item.tags.length" class="flex flex-wrap gap-2">
                  <UBadge 
                    v-for="tag in item.tags" 
                    :key="tag" 
                    variant="outline" 
                    size="xs"
                    color="neutral"
                  >
                    {{ tag }}
                  </UBadge>
                </div>

                <!-- Links -->
                <div class="flex gap-2 pt-2">
                  <UButton 
                    v-if="item.url" 
                    :to="item.url" 
                    external 
                    target="_blank"
                    size="sm" 
                    color="primary" 
                    variant="outline"
                    icon="i-heroicons-arrow-top-right-on-square"
                    data-cursor-pointer
                  >
                    {{ $t('movieCollection.openPage') }}
                  </UButton>
                  <UButton 
                    v-if="item.repo" 
                    :to="item.repo" 
                    external 
                    target="_blank"
                    size="sm" 
                    color="neutral" 
                    variant="outline"
                    icon="i-heroicons-code-bracket"
                    data-cursor-pointer
                  >
                    {{ $t('movieCollection.openRepo') }}
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Footer -->
          <div class="border-t-2 border-current pt-8 mt-12">
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
              {{ $t('movieCollection.disclaimer') }}
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta
useHead({
  title: 'Movie Computer Screens Collection',
  meta: [
    { name: 'description', content: 'A collection of computer interfaces from movies recreated for the web' }
  ]
})

// Color mode and dark mode toggle
const colorMode = useColorMode()
const darkModeButton = ref<HTMLElement>()

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

// Loading state
const isLoading = ref(true)
const loadingFinished = ref(false)

// Search functionality
const searchQuery = ref('')

// Import project data
import projectsData from '~/assets/data/projects.json'
import type { MovieProject, MovieProjects } from '~/assets/data/types'

// Placeholder image for missing images
const placeholderImage = "data:image/svg+xml;charset=utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'><rect width='100%' height='100%' fill='%23fafafa'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica,Arial' font-size='28' fill='%23999'>No Image</text></svg>`
)

// Movie OS Collection Data from JSON
const movieItems = ref<MovieProjects>(projectsData as MovieProjects)

// Get current locale
const { locale } = useI18n()

// Function to get localized description
const getLocalizedDescription = (item: MovieProject) => {
  if (typeof item.desc === 'object') {
    return item.desc[locale.value as keyof typeof item.desc] || item.desc.en || ''
  }
  return item.desc || ''
}

// Computed filtered items
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return movieItems.value
  
  return movieItems.value.filter(item => {
    const localizedDesc = getLocalizedDescription(item)
    const searchableText = [
      item.title,
      item.film,
      item.stack,
      localizedDesc,
      ...(item.tags || [])
    ].join(' ').toLowerCase()
    
    return searchableText.includes(query)
  })
})

// Shuffle functionality
const shuffleItems = () => {
  movieItems.value = [...movieItems.value].sort(() => Math.random() - 0.5)
  
  // Reinitialize animations after shuffle
  nextTick(() => {
    const { $animationUtils } = useNuxtApp()
    if ($animationUtils && typeof $animationUtils === 'object') {
      const utils = $animationUtils as any
      if ('addTiltToAllCards' in utils) {
        utils.addTiltToAllCards()
      }
    }
  })
}

// Loading management
onMounted(async () => {
  // Hide loading screen when page is fully loaded
  if (document.readyState === 'complete') {
    isLoading.value = false
    setTimeout(() => {
      loadingFinished.value = true
    }, 200)
  } else {
    window.addEventListener('load', () => {
      isLoading.value = false
    })
  }

  // Wait for loading to finish before initializing animations
  watch(loadingFinished, (finished) => {
    if (finished) {
      nextTick(() => {
        // Initialize card tilt effects after loading is complete
        const { $animationUtils } = useNuxtApp()

        if ($animationUtils && typeof $animationUtils === 'object') {
          const utils = $animationUtils as any

          // Add tilt effects to all cards on the page
          if ('addTiltToAllCards' in utils) {
            utils.addTiltToAllCards()
          }

          // Add magnetic effect to dark mode button
          if ('addMagneticEffect' in utils && darkModeButton.value) {
            utils.addMagneticEffect([darkModeButton.value])
          }
        }
      })
    }
  })
})
</script>

<style scoped>
/* Additional card hover effects in Swiss Style */
.card-tilt {
  transition: transform 0.2s ease-out;
}

.card-tilt:hover {
  transform: translateY(-4px);
}

/* Ensure proper grid spacing */
.grid {
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid {
    gap: 2rem;
  }
}
</style>