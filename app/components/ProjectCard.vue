<template>
  <UCard class="card-tilt overflow-hidden project-card" :ui="{ body: 'p-0' }">
    <!-- Image -->
    <div class="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <img
        :src="(project.image && project.image.startsWith('http')) ? project.image : (project.image ? mediaBasePath + project.image : placeholderImage)"
        :alt="`${project.title} – ${localizedFilm}`"
        :data-cursor-img="project.animated_image ? (project.animated_image.startsWith('http') ? project.animated_image : mediaBasePath + project.animated_image) : undefined"
        class="w-full h-full object-cover" loading="lazy" />
    </div>

    <!-- Content -->
    <div class="p-6 space-y-4">
      <!-- Title & Film -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          {{ project.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ localizedFilm }}
        </p>
      </div>

      <!-- Description -->
      <p v-if="localizedDescription" class="text-sm text-gray-700 dark:text-gray-300">
        {{ localizedDescription }}
      </p>

      <!-- Tech Stack -->
      <div v-if="project.stack" class="text-xs text-gray-500 dark:text-gray-400">
        <strong>{{ $t('movieCollection.stack') }}:</strong> {{ project.stack }}
      </div>

      <!-- Tags -->
      <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2">
        <UBadge v-for="tag in project.tags" :key="tag" variant="outline" size="xs" color="neutral">
          {{ tag }}
        </UBadge>
      </div>

      <!-- Links -->
      <div class="flex flex-wrap gap-2 pt-2">
        <UButton v-if="project.url" :to="project.url" external target="_blank" size="sm" color="neutral"
          variant="outline" icon="i-heroicons-arrow-top-right-on-square"
          :data-cursor-text="$t('movieCollection.cursorText.openPage')">
          {{ $t('movieCollection.openPage') }}
        </UButton>
        <UButton v-if="project.website_url" :to="project.website_url" external target="_blank" size="sm" color="neutral"
          variant="outline" icon="i-heroicons-globe-alt"
          :data-cursor-text="$t('movieCollection.cursorText.openProjectPage')">
          {{ $t('movieCollection.openProjectPage') }}
        </UButton>
        <UButton v-if="project.repo" :to="project.repo" external target="_blank" size="sm" color="neutral"
          variant="outline" icon="i-heroicons-code-bracket"
          :data-cursor-text="$t('movieCollection.cursorText.openRepo')">
          {{ $t('movieCollection.openRepo') }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { MovieProject } from '~/assets/data/types';
const config = useRuntimeConfig()
const mediaBasePath = config.public.mediaBasePath

// Props
const props = defineProps<{
  project: MovieProject
}>()

// Get current locale
const { locale } = useI18n()

// Computed localized description
const localizedDescription = computed(() => {
  if (typeof props.project.desc === 'object') {
    return props.project.desc[locale.value as keyof typeof props.project.desc] || props.project.desc.en || ''
  }
  return props.project.desc || ''
})

// Computed localized film title
const localizedFilm = computed(() => {
  if (typeof props.project.film === 'object') {
    return props.project.film[locale.value as keyof typeof props.project.film] || props.project.film.en || ''
  }
  return props.project.film || ''
})

// Placeholder image for missing images
const placeholderImage = "data:image/svg+xml;charset=utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'><rect width='100%' height='100%' fill='%23fafafa'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica,Arial' font-size='28' fill='%23999'>No Image</text></svg>`
)
</script>