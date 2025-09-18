<template>
    <Teleport to="body">
        <Transition name="loading" @enter="onEnter" @leave="onLeave">
            <div v-if="isLoading" class="fixed inset-0 z-50 bg-white dark:bg-black transition-all duration-500"
                :class="{ 'opacity-100': isLoading, 'opacity-0': !isLoading }">
                <div class="swiss-grid w-full h-full flex items-center justify-center">
                    <div class="text-center space-y-8">
                        <!-- Logo/Title -->
                        <div class="space-y-4">
                            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                {{ t('loadingScreen.title') }}
                            </h1>
                            <p class="text-lg text-gray-600 dark:text-gray-400">
                                {{ t('loadingScreen.subtitle') }}
                            </p>
                        </div>

                        <!-- Loading Animation -->
                        <div class="space-y-6">
                            <!-- Progress Bar with Indeterminate Animation -->
                            <div class="w-80 max-w-full mx-auto">
                                <UProgress :value="undefined" color="primary" size="md"
                                    class="indeterminate-progress" />
                            </div>

                            <!-- Loading Text -->
                            <div class="flex items-center justify-center space-x-2">
                                <UIcon name="i-lucide-loader-circle" class="w-5 h-5 animate-spin text-primary-500" />
                            </div>
                        </div>

                        <!-- Built with love and author link -->
                        <div class="text-xs text-gray-400 dark:text-gray-600">
                            {{ t('loadingScreen.builtWith') }} ❤️ {{ t('loadingScreen.by') }}
                            <a href="https://github.com/manuelhintermayr" target="_blank" rel="noopener noreferrer"
                                class="font-medium text-black dark:text-white transition-colors duration-200"
                                data-cursor-pointer>
                                Manuel Hintermayr
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
interface Props {
    isLoading: boolean
}

defineProps<Props>()

const { t } = useI18n()

// Animation handlers
const onEnter = (el: Element) => {
    el.classList.add('opacity-100')
}

const onLeave = (el: Element) => {
    el.classList.add('opacity-0')
    setTimeout(() => {
        // Emit event when loading is complete
        if (process.client) {
            window.dispatchEvent(new CustomEvent('loading-complete'))
        }
    }, 500)
}
</script>

<style scoped>
.loading-enter-active,
.loading-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.loading-enter-from,
.loading-leave-to {
    opacity: 0;
}

.indeterminate-progress :deep(.progress-bar) {
    animation: indeterminate 2s infinite linear;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
}

@keyframes indeterminate {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}
</style>
