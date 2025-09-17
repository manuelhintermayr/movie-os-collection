<template>
    <div ref="overlaySection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.overlay.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.overlay.description') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Toast -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.overlay.toast.title') }}</h5>
                </template>
                <div class="p-4 space-y-3">
                    <UButton :label="t('examples.overlay.toast.success')" color="success" variant="soft" block
                        @click="showSuccessToast" />
                    <UButton :label="t('examples.overlay.toast.error')" color="error" variant="soft" block
                        @click="showErrorToast" />
                    <UButton :label="t('examples.overlay.toast.withAction')" color="primary" variant="soft" block
                        @click="showActionToast" />
                    <UButton :label="t('examples.overlay.toast.withProgress')" color="info" variant="soft" block
                        @click="showProgressToast" />
                </div>
            </UCard>

            <!-- Tooltip Examples -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.overlay.tooltip.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-3">
                        <div class="flex justify-center">
                            <UTooltip :text="t('examples.overlay.tooltip.basic')" :content="{ side: 'top' }">
                                <UButton variant="outline" size="sm">
                                    {{ t('examples.overlay.tooltip.hoverTop') }}
                                </UButton>
                            </UTooltip>
                        </div>

                        <div class="flex justify-between">
                            <UTooltip :text="t('examples.overlay.tooltip.left')" :content="{ side: 'left' }">
                                <UButton variant="outline" size="sm">
                                    ← {{ t('examples.overlay.tooltip.left') }}
                                </UButton>
                            </UTooltip>

                            <UTooltip :text="t('examples.overlay.tooltip.right')" :content="{ side: 'right' }">
                                <UButton variant="outline" size="sm">
                                    {{ t('examples.overlay.tooltip.right') }} →
                                </UButton>
                            </UTooltip>
                        </div>

                        <div class="flex justify-center">
                            <UTooltip :text="t('examples.overlay.tooltip.withKbd')" :kbds="['⌘', 'K']"
                                :content="{ side: 'bottom' }">
                                <UButton variant="outline" size="sm" icon="i-lucide-command">
                                    {{ t('examples.overlay.tooltip.withKbd') }}
                                </UButton>
                            </UTooltip>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()

// Section animation
const overlaySection = ref<HTMLElement>()

// Toast methods
const showSuccessToast = () => {
    toast.add({
        title: t('examples.overlay.toast.successTitle'),
        description: t('examples.overlay.toast.successDesc'),
        icon: 'i-lucide-check-circle',
        color: 'success'
    })
}

const showErrorToast = () => {
    toast.add({
        title: t('examples.overlay.toast.errorTitle'),
        description: t('examples.overlay.toast.errorDesc'),
        icon: 'i-lucide-alert-circle',
        color: 'error'
    })
}

const showActionToast = () => {
    toast.add({
        title: t('examples.overlay.toast.actionTitle'),
        description: t('examples.overlay.toast.actionDesc'),
        icon: 'i-lucide-info',
        color: 'primary',
        actions: [
            {
                label: t('examples.overlay.toast.undo'),
                color: 'neutral'
            }
        ]
    })
}

const showProgressToast = () => {
    toast.add({
        title: t('examples.overlay.toast.progressTitle'),
        description: t('examples.overlay.toast.progressDesc'),
        icon: 'i-lucide-download',
        color: 'info',
        progress: {
            color: 'info'
        }
    })
}

onMounted(() => {
    if (!overlaySection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(overlaySection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(overlaySection.value, {
            scrollTrigger: {
                trigger: overlaySection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
