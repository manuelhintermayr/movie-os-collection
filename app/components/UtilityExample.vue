<template>
    <div ref="utilitySection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.utility.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.utility.description') }}
        </p>

        <div class="grid grid-cols-1 gap-6">
            <!-- Command Palette -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.utility.commandPalette.title') }}</h5>
                </template>
                <div class="p-4">
                    <UCollapsible v-model:open="isCommandPaletteCollapsed" class="border rounded">
                        <UButton :label="t('examples.utility.commandPalette.openCollapsible')" color="neutral"
                            variant="ghost" trailing-icon="i-lucide-chevron-down" icon="i-lucide-search" block />
                        <template #content>
                            <div class="p-4 bg-gray-50 dark:bg-gray-800">
                                <p class="text-sm mb-4 text-gray-600 dark:text-gray-400">
                                    {{ t('examples.utility.commandPalette.placeholder') }}
                                </p>
                                <UCommandPalette v-model:open="isCommandPaletteOpen" :groups="commandGroups"
                                    :placeholder="t('examples.utility.commandPalette.placeholder')" class="w-full">
                                    <UButton :label="t('examples.utility.commandPalette.openButton')" color="primary"
                                        variant="solid" icon="i-lucide-search" block />
                                </UCommandPalette>
                                <div
                                    class="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                                    <span>{{ t('examples.utility.commandPalette.keyboardShortcut') }}</span>
                                    <UBadge size="sm">Ctrl+K</UBadge>
                                </div>
                            </div>
                        </template>
                    </UCollapsible>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Section animation
const utilitySection = ref<HTMLElement>()

// Command palette state
const isCommandPaletteOpen = ref(false)
const isCommandPaletteCollapsed = ref(false)

// Command groups for UCommandPalette
const commandGroups = computed(() => [
    {
        id: 'navigation',
        label: t('examples.utility.commandPalette.groups.navigation'),
        items: [
            {
                label: t('examples.utility.commandPalette.commands.home'),
                icon: 'i-lucide-home',
                onSelect: () => closeAndNavigate('/')
            },
            {
                label: t('examples.utility.commandPalette.commands.about'),
                icon: 'i-lucide-info',
                onSelect: () => closeAndNavigate('/')
            },
            {
                label: t('examples.utility.commandPalette.commands.contact'),
                icon: 'i-lucide-mail',
                onSelect: () => closeAndNavigate('/')
            }
        ]
    },
    {
        id: 'actions',
        label: t('examples.utility.commandPalette.groups.actions'),
        items: [
            {
                label: t('examples.utility.commandPalette.commands.toggleTheme'),
                icon: 'i-lucide-moon',
                kbds: ['⌘', 'T'],
                onSelect: () => {
                    const colorMode = useColorMode()
                    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
                    isCommandPaletteOpen.value = false
                }
            },
            {
                label: t('examples.utility.commandPalette.commands.copy'),
                icon: 'i-lucide-copy',
                kbds: ['⌘', 'C'],
                onSelect: () => {
                    navigator.clipboard.writeText(window.location.href)
                    isCommandPaletteOpen.value = false
                }
            },
            {
                label: t('examples.utility.commandPalette.commands.refresh'),
                icon: 'i-lucide-refresh-cw',
                kbds: ['⌘', 'R'],
                onSelect: () => {
                    window.location.reload()
                }
            }
        ]
    },
    {
        id: 'settings',
        label: t('examples.utility.commandPalette.groups.settings'),
        items: [
            {
                label: t('examples.utility.commandPalette.commands.language'),
                icon: 'i-lucide-globe',
                onSelect: () => {
                    const { setLocale, locale } = useI18n()
                    setLocale(locale.value === 'en' ? 'de' : 'en')
                    isCommandPaletteOpen.value = false
                }
            },
            {
                label: t('examples.utility.commandPalette.commands.preferences'),
                icon: 'i-lucide-settings',
                onSelect: () => {
                    isCommandPaletteOpen.value = false
                }
            }
        ]
    }
])

// Command handlers
const closeAndNavigate = (path: string) => {
    isCommandPaletteOpen.value = false
    console.log('Navigate to:', path)
}

// Keyboard shortcut
onMounted(() => {
    if (!utilitySection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(utilitySection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(utilitySection.value, {
            scrollTrigger: {
                trigger: utilitySection.value,
                start: 'top 85%'
            }
        })
    }

    // Keyboard shortcut
    const handleKeydown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault()
            isCommandPaletteOpen.value = !isCommandPaletteOpen.value
        }
    }

    window.addEventListener('keydown', handleKeydown)

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown)
    })
})
</script>
