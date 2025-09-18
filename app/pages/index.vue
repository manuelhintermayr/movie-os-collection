<template>
  <div id="movie-collection-page" class="relative min-h-screen">
    <LoadingScreen :is-loading="!loadingFinished" />

    <!-- Back to Top Button -->
    <Transition name="fade-slide">
      <UButton
        v-if="showBackToTop"
        @click="scrollToTop"
        icon="i-heroicons-arrow-up"
        color="neutral"
        variant="outline"
        size="lg"
        class="fixed bottom-8 right-8 z-40 !w-12 !h-12 !p-0 shadow-lg border-2 border-current flex items-center justify-center"
        ref="backToTopButton"
      />
    </Transition>

    <div v-show="!isLoading" class="min-h-screen swiss-grid">
      <!-- Header -->
      <MovieCollectionHeader ref="headerRef" v-model:search-query="searchQuery" @shuffle="shuffleItems" />

      <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          <!-- Hero Section -->
          <MovieCollectionHero ref="heroRef" />

          <!-- No Results Message -->
          <NoResultsMessage 
            v-if="filteredItems.length === 0 && searchQuery.trim() !== ''"
            :search-query="searchQuery"
            @clear-search="searchQuery = ''"
          />

          <!-- Project Grid -->
          <ProjectGrid ref="gridRef" :projects="filteredItems" />

          <!-- Footer -->
          <MovieCollectionFooter />
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
    { name: 'description', content: 'Explore computer interfaces from movies (1968-2024) recreated as interactive web experiences. From Jurassic Park terminals to Matrix code rain - iconic movie tech brought to life.' },
    { name: 'keywords', content: 'movie computer screens, film interfaces, Jurassic Park terminal, Matrix code, TRON legacy, sci-fi UI, retro computing, movie tech recreation' },
    { property: 'og:title', content: 'Movie Computer Screens Collection' },
    { property: 'og:description', content: 'computer interfaces from movies (1968-2024) recreated as interactive web experiences. From Jurassic Park terminals to Matrix code rain.' }
  ]
})

// Imports
import projectsData from '~/assets/data/projects.json'
import type { MovieProjects } from '~/assets/data/types'

// Component refs
const headerRef = ref()
const heroRef = ref()
const gridRef = ref()
const backToTopButton = ref()

// Reactive data
const isLoading = ref(true)
const loadingFinished = ref(false)
const searchQuery = ref('')
const showBackToTop = ref(false)

// Movie OS Collection Data from JSON
const movieItems = ref<MovieProjects>(projectsData as MovieProjects)

// Computed filtered items
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return movieItems.value

  return movieItems.value.filter(item => {
    const { locale } = useI18n()
    const localizedDesc = typeof item.desc === 'object'
      ? item.desc[locale.value as keyof typeof item.desc] || item.desc.en || ''
      : item.desc || ''

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

// Animation function for cards
const animateCards = () => {
  nextTick(() => {
    const gridContainer = gridRef.value?.gridContainer
    if (gridContainer) {
      const projectCards = Array.from(gridContainer.querySelectorAll('.project-card'))

      if (projectCards.length > 0) {
        // Reset and animate cards
        projectCards.forEach((card: any, index: number) => {
          card.style.opacity = '0'
          card.style.transform = 'translateY(20px)'

          setTimeout(() => {
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
          }, index * 50) // Staggered effect
        })
      }
    }
  })
}

// Watch for search changes and animate cards
watch(searchQuery, () => {
  animateCards()
})

// Shuffle functionality
const shuffleItems = () => {
  movieItems.value = [...movieItems.value].sort(() => Math.random() - 0.5)
  animateCards()
}

// Back to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Handle scroll events for back to top button
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Loading management and GSAP animations
onMounted(async () => {
  // Add scroll event listener for back to top button
  window.addEventListener('scroll', handleScroll)
  
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
          // Get component containers
          const heroContainer = heroRef.value?.heroContainer
          const darkModeButton = headerRef.value?.darkModeButton

          // Hero entrance animation (like in Alba Emoting)
          if (heroContainer) {
            const heroTl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.9 } })
            heroTl.from(heroContainer.querySelector('h2'), { y: 40, opacity: 0, scale: 0.96 }, 0)
              .from(heroContainer.querySelector('p'), { y: 20, opacity: 0 }, '-=0.4')
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
          if (darkModeButton) {
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

            makeMagnet(darkModeButton)
          }

          // Add magnetic effect to back to top button
          if (backToTopButton.value) {
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

            makeMagnet(backToTopButton.value)
          }
        }
      })
    }
  })
})

// Cleanup scroll event listener
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style />