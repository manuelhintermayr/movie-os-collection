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
              <div ref="darkModeButton" 
                   data-cursor-stick
                   :data-cursor-text="colorMode.preference === 'dark' ? $t('movieCollection.cursorText.lightMode') : $t('movieCollection.cursorText.darkMode')">
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
              :data-cursor-text="$t('movieCollection.cursorText.search')"
            />
            <UButton 
              @click="shuffleItems" 
              color="neutral" 
              variant="outline" 
              size="lg"
              icon="i-heroicons-arrow-path"
              :data-cursor-text="$t('movieCollection.cursorText.shuffle')"
            >
              {{ $t('movieCollection.shuffle') }}
            </UButton>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          <!-- Section Title -->
          <div ref="heroContainer" class="text-center reveal">
            <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              {{ $t('movieCollection.collection') }}
            </h2>
            <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {{ $t('movieCollection.subtitle') }}
            </p>
          </div>

          <!-- Grid -->
          <div ref="gridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
            <UCard 
              v-for="(item, index) in filteredItems" 
              :key="`${item.title}-${index}`"
              class="card-tilt overflow-hidden project-card" 
              :ui="{ body: 'p-0' }"
              :data-cursor-img="item.image || placeholderImage"
            >
              <!-- Image -->
              <div class="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden" :data-cursor-text="$t('movieCollection.cursorText.viewProject')">
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
                    :data-cursor-text="$t('movieCollection.cursorText.openPage')"
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
                    :data-cursor-text="$t('movieCollection.cursorText.openRepo')"
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
const heroContainer = ref<HTMLElement | null>(null)
const gridContainer = ref<HTMLElement | null>(null)

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
    if (gridContainer.value) {
      const projectCards = Array.from(gridContainer.value.querySelectorAll('.project-card'))
      
      if (projectCards.length > 0) {
        // Reset and animate cards
        projectCards.forEach((card: any, index: number) => {
          card.style.opacity = '0'
          card.style.transform = 'translateY(20px)'
          
          setTimeout(() => {
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
          }, index * 50) // Faster staggered effect for shuffle
        })
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

  // Initialize GSAP animations after loading
  watch(loadingFinished, (finished) => {
    if (finished) {
      nextTick(async () => {
        // Dynamic import GSAP to avoid SSR issues
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        // Check for reduced motion preference
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger)

        if (!reduce) {
          // Hero entrance animation (like in Alba Emoting)
          if (heroContainer.value) {
            const heroTl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.9 } })
            heroTl.from(heroContainer.value.querySelector('h2'), { y: 40, opacity: 0, scale: 0.96 }, 0)
              .from(heroContainer.value.querySelector('p'), { y: 20, opacity: 0 }, '-=0.4')
          }

          // Reveal cards with GSAP (similar to Alba Emoting card animations)
          gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
            gsap.from(card, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            })
          })

          // Add tilt effects to cards (like in Alba Emoting)
          gsap.utils.toArray('.project-card').forEach((el: any) => {
            const tilt = gsap.quickTo(el, 'rotationY', { duration: 0.3, ease: 'power2.out' })
            const tiltX = gsap.quickTo(el, 'rotationX', { duration: 0.3, ease: 'power2.out' })

            el.addEventListener('mouseenter', () => {
              gsap.to(el, { scale: 1.02, duration: 0.3, ease: 'power2.out' })
            })

            el.addEventListener('mouseleave', () => {
              gsap.to(el, { scale: 1, rotationY: 0, rotationX: 0, duration: 0.3, ease: 'power2.out' })
            })

            el.addEventListener('mousemove', (e: MouseEvent) => {
              const rect = el.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top
              const centerX = rect.width / 2
              const centerY = rect.height / 2
              const rotateX = ((y - centerY) / centerY) * -10
              const rotateY = ((x - centerX) / centerX) * 10

              tilt(rotateY)
              tiltX(rotateX)
            })
          })

          // Add magnetic effect to dark mode button
          if (darkModeButton.value) {
            const makeMagnet = (el: HTMLElement) => {
              const magnetic = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power2.out' })
              const magneticY = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power2.out' })

              el.addEventListener('mouseenter', () => {
                gsap.to(el, { scale: 1.1, duration: 0.3, ease: 'power2.out' })
              })

              el.addEventListener('mouseleave', () => {
                gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
              })

              el.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = el.getBoundingClientRect()
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2

                magnetic(x * 0.3)
                magneticY(y * 0.3)
              })
            }

            makeMagnet(darkModeButton.value)
          }
        }
      })
    }
  })
})
</script>

<style scoped>
/* Swiss Style Design - Clean and minimalist */
.page-container {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
}

/* Hero section styling */
.hero-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.dark .hero-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
}

/* Project cards styling - Enhanced for GSAP animations */
.project-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
  /* GSAP will handle the initial animation state */
}

/* Magnetic button effect */
.dark-mode-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* Search input styling */
.search-input {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.search-input:focus {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.dark .search-input:focus {
  border-color: #fff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

/* Swiss style buttons */
.swiss-button {
  transition: all 0.2s ease;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.swiss-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dark .swiss-button:hover {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
}

/* Card hover effects */
.project-card:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.dark .project-card:hover {
  box-shadow: 0 10px 40px rgba(255, 255, 255, 0.1);
}

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

/* Responsive design adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .project-card {
    margin-bottom: 1rem;
  }
}

/* Animation performance optimizations */
.project-card,
.dark-mode-button {
  will-change: transform;
}

/* Smooth transitions for all interactive elements */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>