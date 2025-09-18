<template>
  <div ref="gridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
    <ProjectCard v-for="(project, index) in projects" :key="`${project.title}-${index}`" :project="project" />
  </div>
</template>

<script setup lang="ts">
import type { MovieProject } from '~/assets/data/types';

// Props
defineProps<{
  projects: MovieProject[]
}>()

const gridContainer = ref<HTMLElement>()

// Expose gridContainer for parent GSAP animations
defineExpose({
  gridContainer
})
</script>