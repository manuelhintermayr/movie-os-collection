<template>
    <UCard class="feature-card border-1 border-current bg-transparent" :ui="{
        header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
        body: 'px-4 py-4 sm:px-6'
    }">
        <template #header>
            <div class="flex items-center">
                <UIcon :name="icon" :class="`w-5 h-5 ${iconColor} mr-2`" />
                <h3 class="text-lg font-semibold">{{ title }}</h3>
            </div>
        </template>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ description }}
        </p>

        <!-- Dark Mode Toggle -->
        <div v-if="hasToggle"
            class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <USwitch
                :model-value="colorMode.preference === 'dark'"
                @update:modelValue="toggleColorMode"
                :label="$t('components.darkModeToggle.label')"
            />
        </div>
    </UCard>
</template>

<script setup lang="ts">
interface Props {
    title: string
    description: string
    icon: string
    iconColor?: string
    hasToggle?: boolean
}

withDefaults(defineProps<Props>(), {
    iconColor: 'text-primary-500',
    hasToggle: false
})

const colorMode = useColorMode()

const toggleColorMode = (val: boolean) => {
    colorMode.preference = val ? 'dark' : 'light'
}
</script>
