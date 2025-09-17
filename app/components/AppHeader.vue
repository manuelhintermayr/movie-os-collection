<template>
    <header class="border-b-2 border-current">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
                <div class="flex items-center">
                    <UIcon name="i-heroicons-rocket-launch" class="w-8 h-8 text-black dark:text-white mr-3" />
                    <h1 ref="brandTitle" class="text-3xl font-bold text-black dark:text-white uppercase tracking-wide">
                        {{ $t('header.title') }}
                    </h1>
                </div>
                <div class="flex items-center space-x-4">
                    <LanguageSwitcher />
                    <div ref="darkModeButton" data-cursor-pointer>
                        <UButton :icon="colorMode.preference === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                            variant="ghost" @click="toggleColorMode"
                            :aria-label="colorMode.preference === 'dark' ? $t('header.switchToLight') : $t('header.switchToDark')" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const brandTitle = ref<HTMLElement>()
const darkModeButton = ref<HTMLElement>()

const toggleColorMode = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
    const { utils } = useAnimations()

    // Add magnetic effect to interactive elements
    if (utils?.addMagneticEffect) {
        nextTick(() => {
            const elements = [darkModeButton.value].filter((el): el is HTMLElement => el !== undefined)
            if (elements.length > 0) {
                utils.addMagneticEffect(elements)
            }
        })
    }
})
</script>
