<template>
  <div ref="heroContainer" class="text-center reveal">
    <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
      {{ $t('movieCollection.collection') }}
    </h2>
    <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
      {{ $t('movieCollection.subtitle') }}
    </p>
  </div>
</template>

<script setup lang="ts">
const heroContainer = ref<HTMLElement>()

// Expose heroContainer for parent GSAP animations
defineExpose({
  heroContainer
})
</script>