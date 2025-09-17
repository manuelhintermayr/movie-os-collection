<template>
    <div ref="alertContainer" class="gsap-loading">
        <div ref="alertElement" class="alert-wrapper">
            <UAlert class="card-tilt" icon="i-heroicons-information-circle"
                :description="$t('examples.alert.description')" :title="$t('examples.alert.title')" color="primary"
                variant="soft" />
        </div>
    </div>
</template>

<script setup lang="ts">
const alertContainer = ref<HTMLElement>()
const alertElement = ref<HTMLElement>()

onMounted(() => {
    if (!alertContainer.value) {
        console.warn('DemoAlert: alertContainer ref is not available')
        return
    }

    if (!alertElement.value) {
        console.warn('DemoAlert: alertElement ref is not available')
        return
    }

    const { setupSection, utils } = useAnimations()

    // Setup section
    setupSection(alertContainer)

    // Animate alert with bounce effect
    if (utils?.scaleIn) {
        utils.scaleIn(alertElement.value, {
            scrollTrigger: {
                trigger: alertContainer.value,
                start: 'top 85%'
            },
            scale: 0.9,
            duration: 0.8,
            ease: 'back.out(1.2)'
        })
    } else {
        console.warn('DemoAlert: scaleIn function not available in utils')
    }
})
</script>
