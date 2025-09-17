<template>
    <div ref="navAdvancedSection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.navigationAdvanced.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.navigationAdvanced.description') }}
        </p>

        <div class="space-y-6">
            <!-- Tabs -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.navigationAdvanced.tabs.title') }}</h5>
                </template>
                <div class="p-4">
                    <UTabs :items="tabItems" class="w-full" />
                </div>
            </UCard>

            <!-- Navigation Menu -->
            <UCard class="card-tilt overflow-visible border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.navigationAdvanced.navigationMenu.title') }}</h5>
                </template>
                <div class="p-4 pb-20">
                    <UNavigationMenu :items="navigationMenuItems" class="w-full justify-center" />
                </div>
            </UCard>

            <!-- Pagination -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.navigationAdvanced.pagination.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="text-center">
                        <UPagination v-model:page="currentPage" :total="totalItems" :items-per-page="itemsPerPage"
                            :sibling-count="2" show-edges />
                    </div>
                    <div class="text-center text-sm text-gray-600 dark:text-gray-400">
                        {{ t('examples.navigationAdvanced.pagination.showing', {
                            start: (currentPage - 1) * itemsPerPage + 1,
                            end: Math.min(currentPage * itemsPerPage, totalItems),
                            total: totalItems
                        }) }}
                    </div>
                </div>
            </UCard>

            <!-- Stepper -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.navigationAdvanced.stepper.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <UStepper :items="stepperItems" v-model="currentStep" />
                    <div class="flex justify-between">
                        <UButton :disabled="currentStep === 0" @click="currentStep = Math.max(0, currentStep - 1)"
                            variant="outline">
                            {{ t('examples.navigationAdvanced.stepper.previous') }}
                        </UButton>
                        <UButton :disabled="currentStep === stepperItems.length - 1"
                            @click="currentStep = Math.min(stepperItems.length - 1, currentStep + 1)">
                            {{ t('examples.navigationAdvanced.stepper.next') }}
                        </UButton>
                    </div>
                </div>
            </UCard>

            <!-- Link Examples -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Links -->
                <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                    <template #header>
                        <h5 class="font-semibold">{{ t('examples.navigationAdvanced.link.title') }}</h5>
                    </template>
                    <div class="p-4 space-y-3">
                        <div class="space-y-2">
                            <ULink to="/" class="block">{{ t('examples.navigationAdvanced.link.home') }}</ULink>
                            <ULink to="/" class="block">{{ t('examples.navigationAdvanced.link.about') }}</ULink>
                            <ULink to="/" active-class="text-primary-500 font-semibold" class="block">
                                {{ t('examples.navigationAdvanced.link.contact') }} ({{
                                    t('examples.navigationAdvanced.link.active')
                                }})
                            </ULink>
                            <ULink href="https://github.com" target="_blank" class="block">
                                {{ t('examples.navigationAdvanced.link.external') }} ↗
                            </ULink>
                        </div>
                    </div>
                </UCard>

                <!-- Modal & Slideover -->
                <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                    <template #header>
                        <h5 class="font-semibold">{{ t('examples.navigationAdvanced.overlays.title') }}</h5>
                    </template>
                    <div class="p-4 space-y-3">
                        <UButton :label="t('examples.navigationAdvanced.overlays.openModal')" variant="outline" block
                            @click="showModal = true" />
                        <UButton :label="t('examples.navigationAdvanced.overlays.openSlideover')" variant="soft" block
                            @click="showSlideover = true" />

                        <!-- Popover with trigger button inside -->
                        <UPopover v-model:open="showPopover">
                            <UButton :label="t('examples.navigationAdvanced.overlays.openPopover')" variant="ghost"
                                block />
                            <template #content>
                                <div class="p-4">
                                    <h6 class="font-semibold mb-2">{{ t('examples.navigationAdvanced.popover.title') }}
                                    </h6>
                                    <p class="text-sm mb-4">{{ t('examples.navigationAdvanced.popover.content') }}</p>
                                    <UButton size="sm" @click="showPopover = false">
                                        {{ t('examples.navigationAdvanced.popover.close') }}
                                    </UButton>
                                </div>
                            </template>
                        </UPopover>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Modal -->
        <UModal v-model:open="showModal">
            <template #content>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">{{ t('examples.navigationAdvanced.modal.title') }}</h3>
                        <UButton icon="i-lucide-x" variant="ghost" size="sm" @click="showModal = false" />
                    </div>
                    <p class="mb-6">{{ t('examples.navigationAdvanced.modal.content') }}</p>
                    <div class="flex justify-end gap-2">
                        <UButton variant="outline" @click="showModal = false">
                            {{ t('examples.navigationAdvanced.modal.cancel') }}
                        </UButton>
                        <UButton @click="showModal = false">
                            {{ t('examples.navigationAdvanced.modal.confirm') }}
                        </UButton>
                    </div>
                </div>
            </template>
        </UModal>

        <!-- Slideover -->
        <USlideover v-model:open="showSlideover">
            <template #content>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">{{ t('examples.navigationAdvanced.slideover.title') }}</h3>
                        <UButton icon="i-lucide-x" variant="ghost" size="sm" @click="showSlideover = false" />
                    </div>
                    <p class="mb-4">{{ t('examples.navigationAdvanced.slideover.content') }}</p>
                    <div class="space-y-2">
                        <UButton :label="t('examples.navigationAdvanced.slideover.option1')" variant="ghost" block />
                        <UButton :label="t('examples.navigationAdvanced.slideover.option2')" variant="ghost" block />
                        <UButton :label="t('examples.navigationAdvanced.slideover.option3')" variant="ghost" block />
                    </div>
                </div>
            </template>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Section animation
const navAdvancedSection = ref<HTMLElement>()

// Navigation states
const currentPage = ref(5)
const totalItems = ref(247)
const itemsPerPage = ref(10)
const currentStep = ref(1)
const showModal = ref(false)
const showSlideover = ref(false)
const showPopover = ref(false)

// Navigation menu items
const navigationMenuItems = computed(() => [
    {
        label: t('examples.navigationAdvanced.navigationMenu.home'),
        icon: 'i-lucide-home',
        to: '/'
    },
    {
        label: t('examples.navigationAdvanced.navigationMenu.products'),
        icon: 'i-lucide-package',
        children: [
            {
                label: t('examples.navigationAdvanced.navigationMenu.web'),
                description: t('examples.navigationAdvanced.navigationMenu.webDesc'),
                icon: 'i-lucide-globe'
            },
            {
                label: t('examples.navigationAdvanced.navigationMenu.mobile'),
                description: t('examples.navigationAdvanced.navigationMenu.mobileDesc'),
                icon: 'i-lucide-smartphone'
            }
        ]
    },
    {
        label: t('examples.navigationAdvanced.navigationMenu.about'),
        icon: 'i-lucide-info',
        to: '/'
    },
    {
        label: t('examples.navigationAdvanced.navigationMenu.contact'),
        icon: 'i-lucide-mail',
        to: '/'
    }
])

// Tab items
const tabItems = computed(() => [
    {
        label: t('examples.navigationAdvanced.tabs.tab1'),
        icon: 'i-lucide-user',
        content: t('examples.navigationAdvanced.tabs.tab1Content'),
        value: 'account'
    },
    {
        label: t('examples.navigationAdvanced.tabs.tab2'),
        icon: 'i-lucide-lock',
        content: t('examples.navigationAdvanced.tabs.tab2Content'),
        value: 'security'
    },
    {
        label: t('examples.navigationAdvanced.tabs.tab3'),
        icon: 'i-lucide-bell',
        content: t('examples.navigationAdvanced.tabs.tab3Content'),
        value: 'notifications'
    }
])

// Stepper items
const stepperItems = computed(() => [
    {
        title: t('examples.navigationAdvanced.stepper.step1'),
        description: t('examples.navigationAdvanced.stepper.step1Desc'),
        icon: 'i-lucide-user'
    },
    {
        title: t('examples.navigationAdvanced.stepper.step2'),
        description: t('examples.navigationAdvanced.stepper.step2Desc'),
        icon: 'i-lucide-settings'
    },
    {
        title: t('examples.navigationAdvanced.stepper.step3'),
        description: t('examples.navigationAdvanced.stepper.step3Desc'),
        icon: 'i-lucide-check'
    }
])

onMounted(() => {
    if (!navAdvancedSection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(navAdvancedSection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(navAdvancedSection.value, {
            scrollTrigger: {
                trigger: navAdvancedSection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
