<template>
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
          :model-value="searchQuery" 
          @update:model-value="$emit('update:search-query', $event)"
          :placeholder="$t('movieCollection.search')" 
          class="flex-1 min-w-72" 
          size="lg"
          icon="i-heroicons-magnifying-glass"
          :data-cursor-text="$t('movieCollection.cursorText.search')"
        />
        <UButton 
          @click="$emit('shuffle')" 
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
</template>

<script setup lang="ts">
// Props
defineProps<{
  searchQuery: string
}>()

// Emits
defineEmits<{
  'update:search-query': [value: string]
  'shuffle': []
}>()

// Color mode
const colorMode = useColorMode()
const darkModeButton = ref<HTMLElement>()

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

// Expose darkModeButton for parent GSAP animations
defineExpose({
  darkModeButton
})
</script>