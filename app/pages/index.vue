<template>
  <div id="nuxt-template-page" class="relative min-h-screen">
    <LoadingScreen :is-loading="!loadingFinished" />

    <div v-show="!isLoading" class="min-h-screen swiss-grid">
      <AppHeader />

      <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          <WelcomeSection />
          <FeaturesGrid />
          <ExamplesSection />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Loading state
const isLoading = ref(true)
const loadingFinished = ref(false)

// Main page with universal card tilt effects and loading management
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
        }
      })
    }
  })
})
</script>