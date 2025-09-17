<template>
    <div ref="inputShowcaseSection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.inputShowcase.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.inputShowcase.description') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Input Number -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.inputNumber.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.inputNumber.basic')
                            }}:</label>
                        <UInputNumber v-model="basicNumber" :min="0" :max="100" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.inputNumber.step')
                            }}:</label>
                        <UInputNumber v-model="stepNumber" :step="5" :min="0" :max="100" />
                    </div>
                </div>
            </UCard>

            <!-- Input Tags -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.inputTags.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">{{ t('examples.inputShowcase.inputTags.skills') }}:</label>
                        <UInputTags v-model="skillTags" class="inputNoBorder"
                            :placeholder="t('examples.inputShowcase.inputTags.placeholder')" />
                    </div>
                    <div class="flex flex-wrap gap-1">
                        <UBadge v-for="tag in skillTags" :key="tag" size="sm" color="primary" variant="soft">
                            {{ tag }}
                        </UBadge>
                    </div>
                </div>
            </UCard>

            <!-- Pin Input -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.pinInput.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.pinInput.otp')
                            }}:</label>
                        <UPinInput v-model="otpCode" :length="6" type="number" otp />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.pinInput.password')
                            }}:</label>
                        <UPinInput v-model="pinCode" :length="4" mask />
                    </div>
                </div>
            </UCard>

            <!-- Select & SelectMenu -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.select.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.select.basic')
                            }}:</label>
                        <USelect v-model="selectedFramework" :items="frameworkOptions" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.select.multiple')
                            }}:</label>
                        <USelect v-model="selectedLanguages" :items="languageOptions" multiple
                            :placeholder="t('examples.inputShowcase.select.multiplePlaceholder')" />
                    </div>
                </div>
            </UCard>

            <!-- Advanced Input -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.advancedInput.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <UInput v-model="searchQuery" icon="i-lucide-search"
                        :placeholder="t('examples.inputShowcase.advancedInput.searchPlaceholder')"
                        :loading="searchLoading" />
                    <UInput v-model="emailInput" trailing-icon="i-lucide-at-sign"
                        :placeholder="t('examples.inputShowcase.advancedInput.emailPlaceholder')" type="email" />
                    <UInput v-model="passwordInput" :trailing-icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                        :type="showPassword ? 'text' : 'password'"
                        :placeholder="t('examples.inputShowcase.advancedInput.passwordPlaceholder')"
                        @click:trailing="showPassword = !showPassword" />
                </div>
            </UCard>

            <!-- Kbd -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.kbd.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <p class="text-sm">{{ t('examples.inputShowcase.kbd.shortcuts') }}</p>
                        <div class="flex flex-wrap gap-2">
                            <UKbd>⌘</UKbd>
                            <UKbd>K</UKbd>
                            <span class="text-sm self-center">{{ t('examples.inputShowcase.kbd.commandPalette')
                            }}</span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <UKbd>Ctrl</UKbd>
                            <UKbd>C</UKbd>
                            <span class="text-sm self-center">{{ t('examples.inputShowcase.kbd.copy') }}</span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <UKbd>Esc</UKbd>
                            <span class="text-sm self-center">{{ t('examples.inputShowcase.kbd.escape') }}</span>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Additional Row for Textarea and Tooltip -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Textarea -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.textarea.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.textarea.basic')
                            }}:</label>
                        <UTextarea v-model="basicTextarea"
                            :placeholder="t('examples.inputShowcase.textarea.placeholder')" :rows="3" class="w-full" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium block mb-1">{{ t('examples.inputShowcase.textarea.autoresize')
                            }}:</label>
                        <UTextarea v-model="autoResizeTextarea"
                            :placeholder="t('examples.inputShowcase.textarea.autoPlaceholder')" autoresize :maxrows="6"
                            class="w-full" />
                    </div>
                </div>
            </UCard>

            <!-- Tooltip -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.inputShowcase.tooltip.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <p class="text-sm">{{ t('examples.inputShowcase.tooltip.description') }}</p>
                        <div class="flex gap-3 flex-wrap">
                            <UTooltip :text="t('examples.inputShowcase.tooltip.basicTooltip')">
                                <UButton color="primary" variant="soft" size="sm">
                                    {{ t('examples.inputShowcase.tooltip.hoverMe') }}
                                </UButton>
                            </UTooltip>

                            <UTooltip :text="t('examples.inputShowcase.tooltip.withKbd')" :kbds="['Ctrl', 'S']">
                                <UButton color="neutral" variant="outline" size="sm" icon="i-lucide-save">
                                    {{ t('examples.inputShowcase.tooltip.save') }}
                                </UButton>
                            </UTooltip>

                            <UTooltip :text="t('examples.inputShowcase.tooltip.withDelay')" :delay-duration="0">
                                <UButton color="success" variant="ghost" size="sm" icon="i-lucide-zap">
                                    {{ t('examples.inputShowcase.tooltip.instant') }}
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

// Section animation
const inputShowcaseSection = ref<HTMLElement>()

// Input states
const basicNumber = ref(5)
const stepNumber = ref(25)
const skillTags = ref(['Vue.js', 'TypeScript', 'Nuxt'])
const otpCode = ref([])
const pinCode = ref([])
const selectedFramework = ref('Vue')
const selectedLanguages = ref(['JavaScript', 'TypeScript'])
const searchQuery = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const searchLoading = ref(false)
const showPassword = ref(false)

// Textarea states
const basicTextarea = ref('')
const autoResizeTextarea = ref(t('examples.inputShowcase.textarea.sampleText'))

// Options
const frameworkOptions = [
    'Vue.js',
    'React',
    'Angular',
    'Svelte',
    'Alpine.js'
]

const languageOptions = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'Go',
    'Rust'
]

// Simulate search loading
watch(searchQuery, () => {
    if (searchQuery.value) {
        searchLoading.value = true
        setTimeout(() => {
            searchLoading.value = false
        }, 1000)
    }
})

onMounted(() => {
    if (!inputShowcaseSection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(inputShowcaseSection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(inputShowcaseSection.value, {
            scrollTrigger: {
                trigger: inputShowcaseSection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
