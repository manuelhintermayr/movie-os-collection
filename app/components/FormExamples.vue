<template>
    <div ref="formSection" class="space-y-6 gsap-loading">
        <h4 ref="formTitle" class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ t('examples.forms.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.forms.description') }}
        </p>

        <!-- Basic Forms Section -->
        <div class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{ t('examples.forms.basicSection') }}</h5>
            <form ref="formGrid" class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <!-- Name, Email, Nachricht -->
                <UInput v-model="name" :placeholder="t('examples.forms.namePlaceholder')" class="col-span-2" />
                <UInput v-model="email" type="email" :placeholder="'sample@mail.com'" class="col-span-2" />
                <UTextarea v-model="message" :placeholder="t('examples.forms.messagePlaceholder')" class="col-span-2" />

                <!-- Submit Button -->
                <div class="col-span-2 flex justify-end">
                    <UButton type="submit" color="primary">{{ t('examples.forms.submit') }}</UButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const formSection = ref<HTMLElement>()
const formTitle = ref<HTMLElement>()
const formGrid = ref<HTMLElement>()

// Form states
const name = ref('')
const email = ref('')
const message = ref('')

onMounted(() => {
    if (!formSection.value) return

    const { setupSection, animateTitle, animateStaggered } = useAnimations()
    setupSection(formSection)
    animateTitle(formTitle, formSection)
    if (formGrid.value?.children) {
        animateStaggered(Array.from(formGrid.value.children), formGrid, {
            y: 20,
            stagger: 0.15
        })
    }
})
</script>
