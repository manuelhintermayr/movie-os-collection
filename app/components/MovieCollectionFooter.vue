<template>
  <div class="border-t-2 border-current pt-8 mt-12 space-y-6">
    <!-- Contribution Section -->
    <div class="text-center space-y-4">
      <h3 class="text-lg font-bold text-black dark:text-white">
        {{ $t('movieCollection.contribute.title') }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {{ $t('movieCollection.contribute.description') }}
      </p>
      <div class="flex justify-center gap-4 flex-wrap">
        <UButton 
          to="https://github.com/manuelhintermayr/movie-os-collection/issues/new?template=suggest-project.md&title=New%20Project%20Suggestion"
          external
          target="_blank"
          size="sm"
          color="neutral"
          variant="outline"
          icon="i-heroicons-plus"
          :data-cursor-text="$t('movieCollection.cursorText.suggestProject')"
        >
          {{ $t('movieCollection.contribute.action') }}
        </UButton>
        <UButton 
          to="https://github.com/manuelhintermayr/movie-os-collection"
          external
          target="_blank"
          size="sm"
          color="neutral"
          variant="outline"
          icon="i-heroicons-code-bracket"
          :data-cursor-text="$t('movieCollection.cursorText.viewRepo')"
        >
          {{ $t('movieCollection.contribute.repository') }}
        </UButton>
      </div>
    </div>
    
    <!-- Disclaimer -->
    <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
        {{ $t('movieCollection.disclaimer') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or emits needed for this component
// It uses the global i18n instance for translations
</script>

<style scoped>
/* Footer-specific styles if needed */
</style>