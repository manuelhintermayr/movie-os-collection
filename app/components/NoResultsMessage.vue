<template>
  <div class="text-center py-16 px-4">
    <div class="border-2 border-current border-dashed rounded-lg p-8 inline-block">
      <UIcon name="i-heroicons-magnifying-glass-minus" class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {{ $t('movieCollection.noResults.title') }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ $t('movieCollection.noResults.message', { query: searchQuery }) }}
      </p>
      <UButton @click="$emit('clear-search')" color="neutral" variant="outline" size="sm">
        {{ $t('movieCollection.noResults.clearSearch') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  searchQuery: string
}>()

// Emits
defineEmits<{
  'clear-search': []
}>()
</script>