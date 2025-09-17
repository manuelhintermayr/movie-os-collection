<template>
    <div ref="examplesContainer" class="space-y-6">
        <h3 ref="examplesTitle" class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ $t('examples.title') }}
        </h3>

        <div ref="exampleComponents" class="space-y-4">
            <MouseFollowerExamples />
            <FormExamples />
            <FormsAdvancedExample />
            <ButtonExamples />
            <InputShowcase />
            <LayoutExample />
            <AccordionExample />
            <AvatarExample />
            <NavigationExample />
            <NavigationAdvanced />
            <DataDisplayExample />
            <OverlayExample />
            <DemoAlert />
            <UtilityExample />
        </div>
    </div>
</template>

<script setup lang="ts">
const examplesContainer = ref<HTMLElement>()
const examplesTitle = ref<HTMLElement>()
const exampleComponents = ref<HTMLElement>()

onMounted(() => {
    if (!examplesContainer.value) return

    const { animateTitle } = useAnimations()

    // Animate title
    animateTitle(examplesTitle, examplesContainer)

    // Each component will handle its own animations through ScrollTrigger
    // This ensures they only animate when they come into view
})
</script>
