<template>
    <div ref="layoutSection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.layout.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.layout.description') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Card Variants -->
            <div class="space-y-4">
                <h5 class="font-medium">{{ t('examples.layout.card.title') }}</h5>

                <!-- Default Card -->
                <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                    <template #header>
                        <h6 class="text-sm font-semibold">{{ t('examples.layout.card.default') }}</h6>
                    </template>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ t('examples.layout.card.defaultDescription') }}
                    </p>
                    <template #footer>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">{{ t('examples.layout.card.footer') }}</span>
                            <UButton size="xs" color="primary" variant="soft">
                                {{ t('examples.layout.card.action') }}
                            </UButton>
                        </div>
                    </template>
                </UCard>

                <!-- Subtle Card -->
                <UCard variant="subtle" class="card-tilt border-1" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1',
                body: 'px-4 py-4 sm:px-6'
            }">
                    <template #header>
                        <h6 class="text-sm font-semibold">{{ t('examples.layout.card.subtle') }}</h6>
                    </template>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ t('examples.layout.card.subtleDescription') }}
                    </p>
                    <template #footer>
                        <div class="flex gap-2">
                            <UButton size="xs" color="neutral" variant="outline">
                                {{ t('examples.layout.card.cancel') }}
                            </UButton>
                            <UButton size="xs" color="primary">
                                {{ t('examples.layout.card.confirm') }}
                            </UButton>
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Container Examples -->
            <div class="space-y-4">
                <h5 class="font-medium">{{ t('examples.layout.container.title') }}</h5>

                <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                    <template #header>
                        <h6 class="text-sm font-semibold">{{ t('examples.layout.container.responsive') }}</h6>
                    </template>
                    <UContainer class="py-4">
                        <div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                            <p class="text-sm text-center">
                                {{ t('examples.layout.container.content') }}
                            </p>
                        </div>
                    </UContainer>
                </UCard>

                <!-- Chip Examples -->
                <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                    <template #header>
                        <h6 class="text-sm font-semibold">{{ t('examples.layout.chip.title') }}</h6>
                    </template>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <UChip :text="5"
                                class="[&>span]:text-sm [&>span]:px-2 [&>span]:py-2 [&>span]:min-w-[28px] [&>span]:min-h-[28px]">
                                <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
                            </UChip>
                            <span class="text-sm">{{ t('examples.layout.chip.withButton') }}</span>
                        </div>

                        <div class="flex items-center gap-4">
                            <UChip color="error" position="top-right">
                                <UAvatar :src="mediaBasePath + 'avatar_1.jpg'" alt="AI Generated Sample Person" />
                            </UChip>
                            <span class="text-sm">{{ t('examples.layout.chip.withAvatar') }}</span>
                        </div>

                        <div class="flex gap-8">
                            <UChip :text="'99+'" color="primary"
                                class="[&>span]:text-sm [&>span]:px-2 [&>span]:py-2 [&>span]:min-w-[32px] [&>span]:min-h-[28px]">
                                <UButton icon="i-lucide-bell" color="neutral" variant="outline" />
                            </UChip>
                            <UChip :text="'New'" color="success"
                                class="[&>span]:text-sm [&>span]:px-3 [&>span]:py-2 [&>span]:min-w-[36px] [&>span]:min-h-[28px]">
                                <UButton icon="i-lucide-star" color="neutral" variant="outline" />
                            </UChip>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const mediaBasePath = config.public.mediaBasePath
const { t } = useI18n()

// Section animation
const layoutSection = ref<HTMLElement>()

onMounted(() => {
    if (!layoutSection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(layoutSection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(layoutSection.value, {
            scrollTrigger: {
                trigger: layoutSection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
