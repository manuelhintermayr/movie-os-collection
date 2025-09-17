<template>
    <div ref="navSection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.navigation.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.navigation.description') }}
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Badges -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.navigation.badges.title') }}</h5>
                </template>
                <div class="space-y-4 p-2">
                    <!-- Different Colors -->
                    <div class="flex flex-wrap items-center gap-2">
                        <UBadge color="primary" variant="solid">{{ t('examples.navigation.badges.primary') }}</UBadge>
                        <UBadge color="success" variant="soft">{{ t('examples.navigation.badges.success') }}</UBadge>
                        <UBadge color="warning" variant="outline">{{ t('examples.navigation.badges.warning') }}</UBadge>
                        <UBadge color="error" variant="subtle">{{ t('examples.navigation.badges.error') }}</UBadge>
                    </div>

                    <!-- With Icons -->
                    <div class="flex flex-wrap items-center gap-2">
                        <UBadge icon="i-heroicons-star" color="primary">{{ t('examples.navigation.badges.featured') }}
                        </UBadge>
                        <UBadge trailing-icon="i-heroicons-arrow-right" color="neutral" variant="outline">
                            {{ t('examples.navigation.badges.next') }}
                        </UBadge>
                    </div>

                    <!-- Sizes -->
                    <div class="flex flex-wrap items-center gap-2">
                        <UBadge size="sm" color="neutral">{{ t('examples.navigation.badges.small') }}</UBadge>
                        <UBadge size="md" color="neutral">{{ t('examples.navigation.badges.medium') }}</UBadge>
                        <UBadge size="lg" color="neutral">{{ t('examples.navigation.badges.large') }}</UBadge>
                    </div>
                </div>
            </UCard>

            <!-- Breadcrumb -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.navigation.breadcrumb.title') }}</h5>
                </template>
                <div class="p-2">
                    <UBreadcrumb :items="breadcrumbItems" />
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const breadcrumbItems = computed(() => [
    {
        label: t('examples.navigation.breadcrumb.home'),
        icon: 'i-heroicons-home',
        to: '/'
    },
    {
        label: t('examples.navigation.breadcrumb.components'),
        icon: 'i-heroicons-squares-2x2',
        to: '/'
    },
    {
        label: t('examples.navigation.breadcrumb.navigation'),
        icon: 'i-heroicons-bars-3'
    }
])

// Section animation
const navSection = ref<HTMLElement>()

onMounted(() => {
    if (!navSection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(navSection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(navSection.value, {
            scrollTrigger: {
                trigger: navSection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
