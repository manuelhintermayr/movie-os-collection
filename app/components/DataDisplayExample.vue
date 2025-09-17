<template>
    <div ref="dataDisplaySection" class="space-y-4 gsap-loading">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ t('examples.dataDisplay.title') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.dataDisplay.description') }}
        </p>

        <div class="space-y-6">
            <!-- Carousel -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.dataDisplay.carousel.title') }}</h5>
                </template>
                <div class="p-4">
                    <UCarousel :items="carouselItems" arrows dots class="w-full">
                        <template #default="{ item }">
                            <div class="flex items-center justify-center h-48 rounded-lg text-white text-lg font-semibold"
                                :style="item.style">
                                {{ item.label }}
                            </div>
                        </template>
                    </UCarousel>
                </div>
            </UCard>

            <!-- Collapsible -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.dataDisplay.collapsible.title') }}</h5>
                </template>
                <div class="p-4 space-y-3">
                    <!-- First Collapsible -->
                    <UCollapsible v-model:open="firstCollapsed" class="border rounded">
                        <UButton :label="t('examples.dataDisplay.collapsible.firstToggle')" color="neutral"
                            variant="ghost" trailing-icon="i-lucide-chevron-down" block />
                        <template #content>
                            <div class="p-4 bg-gray-50 dark:bg-gray-800">
                                <p class="text-sm">{{ t('examples.dataDisplay.collapsible.firstContent') }}</p>
                            </div>
                        </template>
                    </UCollapsible>

                    <!-- Second Collapsible -->
                    <UCollapsible v-model:open="secondCollapsed" class="border rounded">
                        <UButton :label="t('examples.dataDisplay.collapsible.secondToggle')" color="neutral"
                            variant="ghost" trailing-icon="i-lucide-chevron-down" block />
                        <template #content>
                            <div class="p-4 bg-gray-50 dark:bg-gray-800">
                                <p class="text-sm">{{ t('examples.dataDisplay.collapsible.secondContent') }}</p>
                                <UButton size="xs" color="primary" variant="soft" class="mt-2">
                                    {{ t('examples.dataDisplay.collapsible.action') }}
                                </UButton>
                            </div>
                        </template>
                    </UCollapsible>
                </div>
            </UCard>

            <!-- Interactive Menus -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Context Menu -->
                <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                    header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                    body: 'px-4 py-4 sm:px-6'
                }">
                    <template #header>
                        <h5 class="font-semibold">{{ t('examples.dataDisplay.contextMenu.title') }}</h5>
                    </template>
                    <div class="p-4">
                        <UContextMenu :items="contextMenuItems">
                            <div
                                class="flex items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-600 text-sm aspect-video bg-gray-50 dark:bg-gray-800 cursor-pointer">
                                {{ t('examples.dataDisplay.contextMenu.rightClick') }}
                            </div>
                        </UContextMenu>
                    </div>
                </UCard>

                <!-- Dropdown Menu -->
                <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                    header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                    body: 'px-4 py-4 sm:px-6'
                }">
                    <template #header>
                        <h5 class="font-semibold">{{ t('examples.dataDisplay.dropdownMenu.title') }}</h5>
                    </template>
                    <div class="p-4">
                        <UDropdownMenu :items="dropdownMenuItems">
                            <UButton :label="t('examples.dataDisplay.dropdownMenu.trigger')" icon="i-lucide-menu"
                                color="neutral" variant="outline" />
                        </UDropdownMenu>
                    </div>
                </UCard>
            </div>

            <!-- Drawer -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.dataDisplay.drawer.title') }}</h5>
                </template>
                <div class="p-4 flex gap-4">
                    <!-- Bottom Drawer -->
                    <UDrawer v-model:open="showBottomDrawer">
                        <UButton :label="t('examples.dataDisplay.drawer.bottom')" color="neutral" variant="outline" />
                        <template #content>
                            <div class="p-6">
                                <h6 class="font-semibold mb-2">{{ t('examples.dataDisplay.drawer.contentTitle') }}</h6>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    {{ t('examples.dataDisplay.drawer.contentText') }}
                                </p>
                            </div>
                        </template>
                    </UDrawer>

                    <!-- Right Drawer -->
                    <UDrawer v-model:open="showSideDrawer" direction="right">
                        <UButton :label="t('examples.dataDisplay.drawer.right')" color="primary" variant="soft" />
                        <template #content>
                            <div class="p-6 min-w-80">
                                <h6 class="font-semibold mb-4">{{ t('examples.dataDisplay.drawer.sidebarTitle') }}</h6>
                                <div class="space-y-2">
                                    <UButton :label="t('examples.dataDisplay.drawer.profile')" icon="i-lucide-user"
                                        color="neutral" variant="ghost" block />
                                    <UButton :label="t('examples.dataDisplay.drawer.settings')" icon="i-lucide-settings"
                                        color="neutral" variant="ghost" block />
                                    <UButton :label="t('examples.dataDisplay.drawer.logout')" icon="i-lucide-log-out"
                                        color="error" variant="ghost" block />
                                </div>
                            </div>
                        </template>
                    </UDrawer>
                </div>
            </UCard>

            <!-- Tree View -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.dataDisplay.tree.title') }}</h5>
                </template>
                <div class="p-4">
                    <UTree :items="treeItems" class="w-full" :default-expanded="['src']" />
                </div>
            </UCard>

            <!-- Table -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.dataDisplay.table.title') }}</h5>
                </template>
                <div class="p-0">
                    <UTable :data="tableData" :columns="tableColumns" class="w-full" :loading="tableLoading" />
                </div>
            </UCard>

            <!-- Timeline -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.dataDisplay.timeline.title') }}</h5>
                </template>
                <div class="p-4">
                    <UTimeline :items="timelineItems" :default-value="2" class="w-full" />
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Section animation
const dataDisplaySection = ref<HTMLElement>()

// Component states
const firstCollapsed = ref(false)
const secondCollapsed = ref(false)
const showBottomDrawer = ref(false)
const showSideDrawer = ref(false)

// Context Menu items
const contextMenuItems = computed(() => [
    {
        label: t('examples.dataDisplay.contextMenu.copy'),
        icon: 'i-lucide-copy',
        onSelect: () => console.log('Copy clicked')
    },
    {
        label: t('examples.dataDisplay.contextMenu.cut'),
        icon: 'i-lucide-scissors',
        onSelect: () => console.log('Cut clicked')
    },
    {
        label: t('examples.dataDisplay.contextMenu.paste'),
        icon: 'i-lucide-clipboard',
        onSelect: () => console.log('Paste clicked')
    }
])

// Dropdown Menu items
const dropdownMenuItems = computed(() => [
    {
        label: t('examples.dataDisplay.dropdownMenu.profile'),
        icon: 'i-lucide-user',
        onSelect: () => console.log('Profile clicked')
    },
    {
        label: t('examples.dataDisplay.dropdownMenu.settings'),
        icon: 'i-lucide-settings',
        onSelect: () => console.log('Settings clicked')
    },
    {
        label: t('examples.dataDisplay.dropdownMenu.billing'),
        icon: 'i-lucide-credit-card',
        onSelect: () => console.log('Billing clicked')
    },
    {
        type: 'separator' as const
    },
    {
        label: t('examples.dataDisplay.dropdownMenu.logout'),
        icon: 'i-lucide-log-out',
        color: 'error' as const,
        onSelect: () => console.log('Logout clicked')
    }
])

// Carousel data
const carouselItems = [
    {
        label: 'Slide 1',
        style: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);'
    },
    {
        label: 'Slide 2',
        style: 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);'
    },
    {
        label: 'Slide 3',
        style: 'background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);'
    },
    {
        label: 'Slide 4',
        style: 'background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);'
    }
]

// Tree data
const treeItems = computed(() => [
    {
        label: 'src/',
        icon: 'i-lucide-folder',
        value: 'src',
        defaultExpanded: true,
        children: [
            {
                label: 'components/',
                icon: 'i-lucide-folder',
                value: 'components',
                children: [
                    { label: 'Button.vue', icon: 'i-vscode-icons-file-type-vue', value: 'button' },
                    { label: 'Card.vue', icon: 'i-vscode-icons-file-type-vue', value: 'card' }
                ]
            },
            {
                label: 'composables/',
                icon: 'i-lucide-folder',
                value: 'composables',
                children: [
                    { label: 'useAuth.ts', icon: 'i-vscode-icons-file-type-typescript', value: 'auth' }
                ]
            }
        ]
    },
    { label: 'app.vue', icon: 'i-vscode-icons-file-type-vue', value: 'app' },
    { label: 'nuxt.config.ts', icon: 'i-vscode-icons-file-type-nuxt', value: 'config' }
])

// Table data
const tableLoading = ref(false)
const tableColumns = [
    {
        accessorKey: 'name',
        header: () => t('examples.dataDisplay.table.nameColumn'),
        id: 'name'
    },
    {
        accessorKey: 'role',
        header: () => t('examples.dataDisplay.table.roleColumn'),
        id: 'role'
    },
    {
        accessorKey: 'status',
        header: () => t('examples.dataDisplay.table.statusColumn'),
        id: 'status'
    },
    {
        accessorKey: 'email',
        header: () => t('examples.dataDisplay.table.emailColumn'),
        id: 'email'
    }
]

const tableData = computed(() => [
    {
        name: 'John Doe',
        role: 'Developer',
        status: 'Active',
        email: 'john@example.com'
    },
    {
        name: 'Jane Smith',
        role: 'Designer',
        status: 'Active',
        email: 'jane@example.com'
    },
    {
        name: 'Bob Johnson',
        role: 'Manager',
        status: 'Inactive',
        email: 'bob@example.com'
    }
])

// Timeline data
const timelineItems = computed(() => [
    {
        date: 'Mar 15, 2025',
        title: t('examples.dataDisplay.timeline.step1Title'),
        description: t('examples.dataDisplay.timeline.step1Desc'),
        icon: 'i-lucide-rocket',
        value: 1
    },
    {
        date: 'Mar 22, 2025',
        title: t('examples.dataDisplay.timeline.step2Title'),
        description: t('examples.dataDisplay.timeline.step2Desc'),
        icon: 'i-lucide-palette',
        value: 2
    },
    {
        date: 'Mar 29, 2025',
        title: t('examples.dataDisplay.timeline.step3Title'),
        description: t('examples.dataDisplay.timeline.step3Desc'),
        icon: 'i-lucide-code',
        value: 3
    },
    {
        date: 'Apr 5, 2025',
        title: t('examples.dataDisplay.timeline.step4Title'),
        description: t('examples.dataDisplay.timeline.step4Desc'),
        icon: 'i-lucide-check-circle',
        value: 4
    }
])

onMounted(() => {
    if (!dataDisplaySection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(dataDisplaySection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(dataDisplaySection.value, {
            scrollTrigger: {
                trigger: dataDisplaySection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
