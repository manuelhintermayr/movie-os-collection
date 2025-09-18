<template>
    <div class="relative">
        <UButton :label="currentLocaleName" color="neutral" variant="ghost" size="md" icon="i-heroicons-language"
            class="!h-10 !min-h-10 !max-h-10" data-cursor-pointer @click="toggleDropdown" />

        <div v-if="isOpen"
            class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            <div class="border-2 border-current">
                <button v-for="loc in locales" :key="loc.code" :class="[
                    'block w-full text-left px-4 py-2 text-sm',
                    locale === loc.code
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
                ]" data-cursor-pointer @click="switchLanguage(loc.code)">
                    {{ loc.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const LOCALE_STORAGE_KEY = 'preferred-locale'
type LocaleType = 'en' | 'de'

const isOpen = ref(false)

// Get current locale display name
const currentLocaleName = computed(() => {
    const currentLoc = locales.value.find((loc: any) => loc.code === locale.value)
    return currentLoc ? (currentLoc.name?.substring(0, 2) || locale.value.substring(0, 2).toUpperCase()) : locale.value.substring(0, 2).toUpperCase()
})

const setLocaleWithStorage = (newLocale: LocaleType) => {
    setLocale(newLocale)
    saveLocaleToStorage(newLocale)
}

const saveLocaleToStorage = (localeValue: LocaleType) => {
    if (import.meta.client) {
        localStorage.setItem(LOCALE_STORAGE_KEY, localeValue)
    }
}

const loadLocaleFromStorage = (): LocaleType => {
    if (import.meta.client) {
        const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY)
        return (savedLocale === 'en' || savedLocale === 'de') ? savedLocale : 'en'
    }
    return 'en'
}

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const switchLanguage = (newLocale: string) => {
    if (newLocale !== locale.value && (newLocale === 'en' || newLocale === 'de')) {
        setLocaleWithStorage(newLocale as LocaleType)
        isOpen.value = false
    }
}

// Close dropdown when clicking outside
const closeDropdown = (e: Event) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
        isOpen.value = false
    }
}

onMounted(() => {
    const savedLocale = loadLocaleFromStorage()
    if (savedLocale !== locale.value) {
        setLocale(savedLocale)
    }
    if (!import.meta.client || !localStorage.getItem(LOCALE_STORAGE_KEY)) {
        saveLocaleToStorage(savedLocale)
    }

    document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
})
</script>
