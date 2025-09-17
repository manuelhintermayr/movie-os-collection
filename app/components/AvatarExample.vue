<template>
    <div ref="avatarSection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.avatar.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.avatar.description') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Basic Avatars -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.avatar.basic') }}</h5>
                </template>
                <div class="flex items-center space-x-4 p-4">
                    <UAvatar :src="mediaBasePath + 'avatar_1.jpg'" alt="AI Generated Sample Person 1" size="sm" />
                    <UAvatar :src="mediaBasePath + 'avatar_2.jpg'" alt="AI Generated Sample Person 2" size="md" />
                    <UAvatar :src="mediaBasePath + 'avatar_3.jpg'" alt="AI Generated Sample Person 3" size="lg" />
                    <UAvatar :src="mediaBasePath + 'avatar_1.jpg'" alt="AI Generated Sample Person" size="xl" />
                </div>
            </UCard>

            <!-- Avatar Group -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.avatar.group') }}</h5>
                </template>
                <div class="p-4">
                    <UAvatarGroup size="md" :max="3">
                        <UAvatar :src="mediaBasePath + 'avatar_1.jpg'" alt="AI Generated Sample Person 1" />
                        <UAvatar :src="mediaBasePath + 'avatar_2.jpg'" alt="AI Generated Sample Person 2" />
                        <UAvatar :src="mediaBasePath + 'avatar_3.jpg'" alt="AI Generated Sample Person 3" />
                        <UAvatar :src="mediaBasePath + 'avatar_1.jpg'" alt="AI Generated Sample Person" />
                        <UAvatar :src="mediaBasePath + 'avatar_2.jpg'" alt="AI Generated Sample Person" />
                    </UAvatarGroup>
                </div>
            </UCard>

            <!-- Fallback Avatars -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.avatar.fallback') }}</h5>
                </template>
                <div class="flex items-center justify-center space-x-4 p-4">
                    <UAvatar icon="i-heroicons-user" size="md" />
                    <UAvatar text="MH" size="md" />
                    <UAvatar alt="John Doe" size="md" />
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const mediaBasePath = config.public.mediaBasePath
const { t } = useI18n()

// Section animation
const avatarSection = ref<HTMLElement>()

onMounted(() => {
    if (!avatarSection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(avatarSection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(avatarSection.value, {
            scrollTrigger: {
                trigger: avatarSection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
