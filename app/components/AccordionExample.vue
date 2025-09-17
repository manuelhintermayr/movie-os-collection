<template>
    <div ref="accordionSection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.accordion.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.accordion.description') }}
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Basic Accordion -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.accordion.basic') }}</h5>
                </template>
                <UAccordion :items="basicAccordionItems" class="w-full" />
            </UCard>

            <!-- Multiple Type Accordion -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.accordion.multiple') }}</h5>
                </template>
                <UAccordion type="multiple" :items="multipleAccordionItems" class="w-full" />
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const basicAccordionItems = computed(() => [
    {
        label: t('examples.accordion.items.setup.title'),
        icon: 'i-heroicons-cog-6-tooth',
        content: t('examples.accordion.items.setup.content')
    },
    {
        label: t('examples.accordion.items.customization.title'),
        icon: 'i-heroicons-paint-brush',
        content: t('examples.accordion.items.customization.content')
    },
    {
        label: t('examples.accordion.items.deployment.title'),
        icon: 'i-heroicons-rocket-launch',
        content: t('examples.accordion.items.deployment.content')
    }
])

const multipleAccordionItems = computed(() => [
    {
        label: t('examples.accordion.items.features.title'),
        icon: 'i-heroicons-star',
        content: t('examples.accordion.items.features.content')
    },
    {
        label: t('examples.accordion.items.support.title'),
        icon: 'i-heroicons-question-mark-circle',
        content: t('examples.accordion.items.support.content')
    }
])

// Section animation
const accordionSection = ref<HTMLElement>()

onMounted(() => {
    if (!accordionSection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(accordionSection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(accordionSection.value, {
            scrollTrigger: {
                trigger: accordionSection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
