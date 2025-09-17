<template>
    <div ref="formsAdvancedSection" class="space-y-4 gsap-loading">
        <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">
            {{ t('examples.formsAdvanced.title') }}
        </h5>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ t('examples.formsAdvanced.description') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Calendar -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.calendar.title') }}</h5>
                </template>
                <div class="p-2">
                    <UCalendar v-model="selectedDate" size="sm" />
                </div>
            </UCard>

            <!-- Calendar Range -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.calendar.rangeTitle') }}</h5>
                </template>
                <div class="p-2">
                    <UCalendar v-model="selectedDateRange" range size="sm" />
                </div>
            </UCard>

            <!-- DatePicker with Popover -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.calendar.pickerTitle') }}</h5>
                </template>
                <div class="p-4 space-y-3">
                    <div>
                        <label class="text-sm font-medium mb-2 block">{{ t('examples.formsAdvanced.calendar.selectDate')
                            }}</label>
                        <UPopover>
                            <UButton color="neutral" variant="outline" icon="i-heroicons-calendar-days"
                                class="justify-start">
                                {{ formattedPickerDate }}
                            </UButton>

                            <template #content>
                                <UCalendar v-model="selectedPickerDate" class="p-2" />
                            </template>
                        </UPopover>
                    </div>
                </div>
            </UCard>

            <!-- DateRange Picker with Popover -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.calendar.rangePickerTitle') }}</h5>
                </template>
                <div class="p-4 space-y-3">
                    <div>
                        <label class="text-sm font-medium mb-2 block">{{
                            t('examples.formsAdvanced.calendar.selectRange') }}</label>
                        <UPopover>
                            <UButton color="neutral" variant="outline" icon="i-heroicons-calendar-days"
                                class="justify-start">
                                {{ formattedRangePickerDate }}
                            </UButton>

                            <template #content>
                                <UCalendar v-model="selectedRangePickerDate" range class="p-2" />
                            </template>
                        </UPopover>
                    </div>
                </div>
            </UCard>

            <!-- Multiple Checkboxes -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.checkboxGroup.title') }}</h5>
                </template>
                <div class="p-2 space-y-3">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">{{ t('examples.formsAdvanced.checkboxGroup.title') }}</label>
                        <div class="space-y-2">
                            <UCheckbox v-model="darkModeEnabled"
                                :label="t('examples.formsAdvanced.checkboxGroup.darkMode')" />
                            <UCheckbox v-model="animationsEnabled"
                                :label="t('examples.formsAdvanced.checkboxGroup.animations')" />
                            <UCheckbox v-model="notificationsEnabled"
                                :label="t('examples.formsAdvanced.checkboxGroup.notifications')" />
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Radio Group -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.radioGroup.title') }}</h5>
                </template>
                <div class="p-2">
                    <URadioGroup v-model="selectedTheme" :items="radioOptions" legend="Theme" />
                </div>
            </UCard>

            <!-- Switch -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.switch.title') }}</h5>
                </template>
                <div class="p-2 space-y-3">
                    <USwitch v-model="notificationsSwitch" :label="t('examples.formsAdvanced.switch.notifications')" />
                    <USwitch v-model="autoSave" :label="t('examples.formsAdvanced.switch.autoSave')"
                        :description="t('examples.formsAdvanced.switch.autoSaveDesc')" />
                </div>
            </UCard>

            <!-- Slider -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.slider.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">{{ t('examples.formsAdvanced.slider.volume') }}: {{
                            volumeValue
                            }}%</label>
                        <USlider v-model="volumeValue" :min="0" :max="100" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium">{{ t('examples.formsAdvanced.slider.range') }}</label>
                        <USlider v-model="rangeValues" :min="0" :max="100" />
                    </div>
                </div>
            </UCard>

            <!-- Progress -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.progress.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <UProgress :model-value="progressValue" :max="100" status />
                        <div class="flex justify-between">
                            <UButton size="xs" @click="progressValue = Math.max(0, progressValue - 10)">-10</UButton>
                            <UButton size="xs" @click="progressValue = Math.min(100, progressValue + 10)">+10</UButton>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium">{{ t('examples.formsAdvanced.progress.indeterminate')
                            }}</label>
                        <UProgress />
                    </div>
                </div>
            </UCard>

            <!-- ColorPicker -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.colorPicker.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">{{ t('examples.formsAdvanced.colorPicker.basic') }}</label>
                        <UColorPicker v-model="selectedColor" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium">{{ t('examples.formsAdvanced.colorPicker.withPopover')
                        }}</label>
                        <UPopover>
                            <UButton color="neutral" variant="outline" class="justify-start gap-2 ml-4">
                                <div class="w-4 h-4 rounded border border-gray-300"
                                    :style="{ backgroundColor: selectedColorPopover }"></div>
                                {{ selectedColorPopover }}
                            </UButton>
                            <template #content>
                                <UColorPicker v-model="selectedColorPopover" class="p-2" />
                            </template>
                        </UPopover>
                    </div>
                </div>
            </UCard>

            <!-- File Upload -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.fileUpload.title') }}</h5>
                </template>
                <div class="p-2">
                    <UFileUpload v-model="uploadedFiles" :label="t('examples.formsAdvanced.fileUpload.label')"
                        :description="t('examples.formsAdvanced.fileUpload.description')" accept="image/*" multiple
                        class="min-h-32" />
                </div>
            </UCard>

            <!-- Kbd (Keyboard shortcuts) -->
            <UCard class="card-tilt border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                <template #header>
                    <h5 class="font-semibold">{{ t('examples.formsAdvanced.kbd.title') }}</h5>
                </template>
                <div class="p-4 space-y-4">
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label class="text-sm font-medium block mb-2">{{ t('examples.formsAdvanced.kbd.color')
                                }}</label>
                            <USelect v-model="kbdColor" :items="kbdColorOptions"
                                :placeholder="t('examples.formsAdvanced.kbd.selectColor')" class="w-full" />
                        </div>
                        <div class="flex-1">
                            <label class="text-sm font-medium block mb-2">{{ t('examples.formsAdvanced.kbd.variant')
                                }}</label>
                            <USelect v-model="kbdVariant" :items="kbdVariantOptions"
                                :placeholder="t('examples.formsAdvanced.kbd.selectVariant')" class="w-full" />
                        </div>
                    </div>

                    <div class="flex justify-center py-4">
                        <UKbd :color="kbdColor" :variant="kbdVariant">K</UKbd>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

const { t } = useI18n()

// Date formatter for displaying dates in a readable format
const df = new DateFormatter('en-US', {
    dateStyle: 'medium'
})

// Section animation
const formsAdvancedSection = ref<HTMLElement>()

// Form states - using any for now to avoid complex type issues
const selectedDate = ref<any>(null)
const selectedDateRange = ref<any>(null)
const selectedPickerDate = ref<any>(null)
const selectedRangePickerDate = ref<any>(null)
const selectedColor = ref('#00C16A')
const selectedColorPopover = ref('#00BCD4')
const uploadedFiles = ref<File[]>([])
const kbdColor = ref<'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'>('neutral')
const kbdVariant = ref<'solid' | 'outline' | 'soft' | 'subtle'>('solid')
const darkModeEnabled = ref(true)
const animationsEnabled = ref(false)
const notificationsEnabled = ref(true)

// New form states
const selectedTheme = ref('system')
const notificationsSwitch = ref(true)
const autoSave = ref(false)
const volumeValue = ref(75)
const rangeValues = ref([25, 75])
const progressValue = ref(65)

// Kbd options
const kbdColorOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Success', value: 'success' },
    { label: 'Info', value: 'info' },
    { label: 'Warning', value: 'warning' },
    { label: 'Error', value: 'error' },
    { label: 'Neutral', value: 'neutral' }
]

const kbdVariantOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Outline', value: 'outline' },
    { label: 'Soft', value: 'soft' },
    { label: 'Subtle', value: 'subtle' }
]

// Radio options
const radioOptions = computed(() => [
    { label: t('examples.formsAdvanced.radioGroup.light'), value: 'light' },
    { label: t('examples.formsAdvanced.radioGroup.dark'), value: 'dark' },
    { label: t('examples.formsAdvanced.radioGroup.system'), value: 'system' }
])

// Formatted picker date
const formattedPickerDate = computed(() => {
    if (selectedPickerDate.value && typeof selectedPickerDate.value === 'object' && 'toDate' in selectedPickerDate.value) {
        return df.format((selectedPickerDate.value as any).toDate(getLocalTimeZone()))
    }
    return t('examples.formsAdvanced.calendar.placeholder')
})

// Formatted range picker date
const formattedRangePickerDate = computed(() => {
    if (selectedRangePickerDate.value && typeof selectedRangePickerDate.value === 'object' && 'start' in selectedRangePickerDate.value) {
        const range = selectedRangePickerDate.value as any
        if (range.start && range.end) {
            const startDate = df.format(range.start.toDate(getLocalTimeZone()))
            const endDate = df.format(range.end.toDate(getLocalTimeZone()))
            return `${startDate} - ${endDate}`
        }
    }
    return t('examples.formsAdvanced.calendar.rangePlaceholder')
})

onMounted(() => {
    if (!formsAdvancedSection.value) return

    const { setupSection, utils } = useAnimations()

    // Setup section with proper loading removal
    setupSection(formsAdvancedSection)

    if (utils?.fadeInUp) {
        utils.fadeInUp(formsAdvancedSection.value, {
            scrollTrigger: {
                trigger: formsAdvancedSection.value,
                start: 'top 85%'
            }
        })
    }
})
</script>
