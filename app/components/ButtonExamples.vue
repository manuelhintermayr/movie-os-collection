<template>
    <div ref="buttonSection" class="space-y-6 gsap-loading">
        <h4 ref="buttonTitle" class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ $t('examples.buttons.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ $t('examples.buttons.description') }}
        </p>

        <!-- Default Buttons Section -->
        <h5 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('examples.buttons.defaultSection')
            }}</h5>
        <div ref="buttonGrid" class="flex flex-wrap gap-2">
            <UButton data-cursor-pointer>{{ $t('examples.buttons.default') }}</UButton>
            <UButton color="primary" variant="solid" data-cursor-pointer>{{ $t('examples.buttons.primary') }}</UButton>
            <UButton color="neutral" variant="soft" data-cursor-pointer>{{ $t('examples.buttons.softNeutral') }}
            </UButton>
            <UButton color="error" variant="outline" data-cursor-pointer>{{ $t('examples.buttons.outlineError') }}
            </UButton>
            <UButton variant="ghost" class="bg-transparent" data-cursor-pointer>{{ $t('examples.buttons.ghost') }}</UButton>
            <UButton variant="link" class="bg-transparent hover:bg-transparent" data-cursor-pointer>{{ $t('examples.buttons.link') }}</UButton>
        </div>

        <!-- Button Groups Section -->
        <h5 class="text-md font-medium text-gray-700 dark:text-gray-300 mt-6 mb-2">{{
            $t('examples.buttons.buttonGroupsSection') }}</h5>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Horizontal Button Group -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ $t('examples.buttons.buttonGroups.horizontal') }}</h5>
                </template>
                <div class="p-1">
                    <UButtonGroup>
                        <UButton color="neutral" variant="outline" :label="$t('examples.buttons.buttonGroups.edit')"
                            icon="i-heroicons-pencil" />
                        <UButton color="neutral" variant="outline" :label="$t('examples.buttons.buttonGroups.share')"
                            icon="i-heroicons-share" />
                        <UButton color="neutral" variant="outline" :label="$t('examples.buttons.buttonGroups.delete')"
                            icon="i-heroicons-trash" />
                    </UButtonGroup>
                </div>
            </UCard>

            <!-- Vertical Button Group -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ $t('examples.buttons.buttonGroups.vertical') }}</h5>
                </template>
                <div class="p-4">
                    <UButtonGroup orientation="vertical" class="w-fit">
                        <UButton color="neutral" variant="outline" :label="$t('examples.buttons.buttonGroups.profile')"
                            icon="i-heroicons-user" />
                        <UButton color="neutral" variant="outline" :label="$t('examples.buttons.buttonGroups.settings')"
                            icon="i-heroicons-cog-6-tooth" />
                        <UButton color="neutral" variant="outline" :label="$t('examples.buttons.buttonGroups.logout')"
                            icon="i-heroicons-arrow-left-on-rectangle" />
                    </UButtonGroup>
                </div>
            </UCard>

            <!-- Input with Button -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ $t('examples.buttons.buttonGroups.input') }}</h5>
                </template>
                <div class="p-4">
                    <UButtonGroup>
                        <UInput color="neutral" variant="outline"
                            :placeholder="$t('examples.buttons.buttonGroups.emailPlaceholder')" />
                        <UButton color="primary" variant="solid"
                            :label="$t('examples.buttons.buttonGroups.subscribe')" />
                    </UButtonGroup>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const buttonSection = ref<HTMLElement>()
const buttonTitle = ref<HTMLElement>()
const buttonGrid = ref<HTMLElement>()

onMounted(() => {
    if (!buttonSection.value) return

    const { setupSection, animateTitle, animateButtons } = useAnimations()

    // Setup section with common patterns
    setupSection(buttonSection)

    // Animate title
    animateTitle(buttonTitle, buttonSection)

    // Animate buttons with magnetic effects
    animateButtons('button', buttonGrid)
})
</script>
