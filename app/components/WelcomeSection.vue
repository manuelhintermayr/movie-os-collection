<template>
    <div ref="heroContainer" class="text-center">
        <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            {{ $t('welcome.title') }}
        </h2>

        <p class="mt-6 text-xl text-gray-600 dark:text-gray-300">
            {{ $t('welcome.subtitle') }}
        </p>

        <!-- Author and GitHub Information -->
        <div class="mt-8 space-y-4">
            <div class="text-center">
                <p class="text-sm text-black dark:text-white">
                    {{ $t('welcome.builtWith') }} ❤️ {{ $t('welcome.by') }}
                    <a href="https://github.com/manuelhintermayr" target="_blank" rel="noopener noreferrer"
                        class="font-medium transition-colors duration-200"
                        data-cursor-pointer>
                        Manuel Hintermayr
                    </a>
                </p>
            </div>

            <div class="flex justify-center items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <a href="https://github.com/manuelhintermayr/nuxt4-template-swiss-style" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center space-x-2 transition-colors duration-200 text-black dark:text-white"
                    :data-cursor-text="$t('welcome.clickHere')">
                    <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 text-black dark:text-white" />
                    <span>{{ $t('welcome.repository') }}</span>
                </a>

                <span class="text-gray-400 dark:text-gray-600">•</span>

                <span class="inline-flex items-center space-x-2">
                    <UIcon name="i-heroicons-star" class="w-4 h-4" />
                    <span>{{ $t('welcome.productionReady') }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const heroContainer = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!heroContainer.value) return
    const { utils } = useAnimations()

    if (utils?.heroEntrance && heroContainer.value) {
        setTimeout(() => {
            utils.heroEntrance(heroContainer.value as Element)
        }, 300)
    }
})
</script>
