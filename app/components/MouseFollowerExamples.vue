<template>
    <div ref="mouseSection" class="space-y-6 gsap-loading">
        <h4 ref="mouseTitle" class="text-lg font-semibold text-gray-900 dark:text-white">{{
            $t('examples.mouseFollower.title') }}</h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ $t('examples.mouseFollower.description') }}
        </p>

        <!-- Project Cards Section -->
        <div ref="cardsSection" class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{
                $t('examples.mouseFollower.projectCards') }}</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UCard class="card-tilt cursor-pointer border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }"
                    :data-cursor-text="$t('examples.mouseFollower.cursorText.viewDetails')">
                    <template #header>
                        <div class="flex items-center">
                            <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 text-black dark:text-white mr-2" />
                            <h3 class="text-lg font-semibold">{{ $t('examples.mouseFollower.project1.title') }}</h3>
                        </div>
                    </template>
                    <p class="text-gray-600 dark:text-gray-300">
                        {{ $t('examples.mouseFollower.project1.description') }}
                    </p>
                </UCard>

                <UCard class="card-tilt cursor-pointer border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }"
                    :data-cursor-text="$t('examples.mouseFollower.cursorText.exploreProject')">
                    <template #header>
                        <div class="flex items-center">
                            <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-black dark:text-white mr-2" />
                            <h3 class="text-lg font-semibold">{{ $t('examples.mouseFollower.project2.title') }}</h3>
                        </div>
                    </template>
                    <p class="text-gray-600 dark:text-gray-300">
                        {{ $t('examples.mouseFollower.project2.description') }}
                    </p>
                </UCard>
            </div>
        </div>

        <!-- Text Effects Section -->
        <div ref="textSection" class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{ $t('examples.mouseFollower.textEffects')
                }}</h5>
            <div class="p-4 bg-gray-50 dark:bg-gray-800 border-1 border-current">
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                    {{ $t('examples.mouseFollower.textDemo.intro') }}
                    <span :data-cursor-text="$t('examples.mouseFollower.cursorText.customMessage')"
                        class="text-primary-600 dark:text-primary-400 font-medium cursor-pointer">
                        {{ $t('examples.mouseFollower.textDemo.hoverText') }}
                    </span>
                    {{ $t('examples.mouseFollower.textDemo.middle') }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                    <span :data-cursor-text="$t('examples.mouseFollower.cursorText.stickyCursor')" data-cursor-stick
                        class="text-blue-600 dark:text-blue-400 font-medium cursor-pointer">
                        {{ $t('examples.mouseFollower.textDemo.stickyText') }}
                    </span>
                    {{ $t('examples.mouseFollower.textDemo.outro') }}
                </p>
            </div>
        </div>

        <!-- Configuration Options Section -->
        <div ref="configSection" class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{
                $t('examples.mouseFollower.configuration.title') }}
            </h5>
            <div>
                <UCard class="w-full border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }">
                    <template #header>
                        <h6 class="font-semibold">{{ $t('examples.mouseFollower.configuration.speed') }}</h6>
                    </template>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-600 dark:text-gray-400 w-12">{{
                                $t('examples.mouseFollower.configuration.slow') }}</span>
                            <USlider v-model="cursorSpeed" :min="0.1" :max="2" :step="0.1" class="flex-1"
                                @update:modelValue="updateCursorSpeed" />
                            <span class="text-sm text-gray-600 dark:text-gray-400 w-12">{{
                                $t('examples.mouseFollower.configuration.fast') }}</span>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
                            {{ $t('examples.mouseFollower.configuration.currentSpeed') }}: {{ cursorSpeed }}
                        </p>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Special States Section -->
        <div ref="statesSection" class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{
                $t('examples.mouseFollower.specialStates') }}
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div data-cursor="-inverse"
                    class="card-tilt p-4 bg-gray-900 text-white rounded-lg text-center cursor-pointer relative overflow-hidden">
                    <UIcon name="i-heroicons-moon" class="w-6 h-6 mx-auto mb-2 text-white" />
                    <p class="text-sm font-medium">{{ $t('examples.mouseFollower.states.inverse') }}</p>
                    <p class="text-xs text-gray-300 mt-1">{{ $t('examples.mouseFollower.states.inverseDesc') }}</p>

                    <!-- Dark mode overlay -->
                    <div
                        class="hidden dark:flex absolute inset-0 bg-gray-800/60 backdrop-blur-[2px] items-center justify-center rounded-lg">
                        <div class="text-center px-2 bg-gray-900/80 rounded-md py-2 px-3">
                            <UIcon name="i-heroicons-no-symbol" class="w-6 h-6 mx-auto mb-1 text-black dark:text-white" />
                            <p class="text-xs font-medium text-gray-200 leading-tight">{{
                                $t('examples.mouseFollower.states.inverseDarkMode') }}</p>
                        </div>
                    </div>
                </div>

                <div data-cursor="-hidden"
                    class="card-tilt p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center cursor-pointer">
                    <UIcon name="i-heroicons-eye-slash" class="w-6 h-6 mx-auto mb-2 text-black dark:text-white" />
                    <p class="text-sm font-medium text-red-700 dark:text-red-400">{{
                        $t('examples.mouseFollower.states.hidden')
                    }}</p>
                    <p class="text-xs text-red-600 dark:text-red-300 mt-1">{{
                        $t('examples.mouseFollower.states.hiddenDesc') }}
                    </p>
                </div>

                <div class="card-tilt p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-center cursor-pointer"
                    data-cursor="-theme" :data-cursor-text="$t('examples.mouseFollower.cursorText.themeElement')">
                    <UIcon name="i-heroicons-paint-brush" class="w-6 h-6 mx-auto mb-2 text-black dark:text-white theme-icon" />
                    <p class="text-sm font-medium">{{ $t('examples.mouseFollower.states.theme') }}</p>
                    <p class="text-xs text-purple-100 mt-1">{{ $t('examples.mouseFollower.states.themeDesc') }}</p>
                </div>

                <div class="card-tilt p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center cursor-pointer"
                    data-cursor="-opaque">
                    <UIcon name="i-heroicons-adjustments-horizontal" class="w-6 h-6 mx-auto mb-2 text-black dark:text-white" />
                    <p class="text-sm font-medium text-blue-700 dark:text-blue-400">{{
                        $t('examples.mouseFollower.states.opaque') }}</p>
                    <p class="text-xs text-blue-600 dark:text-blue-300 mt-1">{{
                        $t('examples.mouseFollower.states.opaqueDesc') }}</p>
                </div>

                <div class="card-tilt p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-center cursor-pointer"
                    data-cursor="-pointer">
                    <UIcon name="i-heroicons-cursor-arrow-rays" class="w-6 h-6 mx-auto mb-2 text-black dark:text-white" />
                    <p class="text-sm font-medium text-yellow-700 dark:text-yellow-400">{{
                        $t('examples.mouseFollower.states.pointer') }}</p>
                    <p class="text-xs text-yellow-600 dark:text-yellow-300 mt-1">{{
                        $t('examples.mouseFollower.states.pointerDesc') }}</p>
                </div>

                <div class="card-tilt p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center cursor-pointer"
                    @mouseenter="addCustomState" @mouseleave="removeCustomState">
                    <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6 mx-auto mb-2 text-black dark:text-white" />
                    <p class="text-sm font-medium text-indigo-700 dark:text-indigo-400">{{
                        $t('examples.mouseFollower.states.custom') }}</p>
                    <p class="text-xs text-indigo-600 dark:text-indigo-300 mt-1">{{
                        $t('examples.mouseFollower.states.customDesc') }}</p>
                </div>
            </div>
        </div>

        <!-- Media Section (Images & Videos) -->
        <div class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{
                $t('examples.mouseFollower.mediaEffects') }}
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Sample Images -->
                <div class="card-tilt p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg text-center cursor-pointer border border-blue-200 dark:border-blue-800"
                    :data-cursor-img="mediaBasePath + 'sample.jpg'">
                    <UIcon name="i-heroicons-photo" class="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                    <h6 class="font-semibold mb-2 text-gray-800 dark:text-gray-200">{{
                        $t('examples.mouseFollower.media.image1.title') }}</h6>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{
                        $t('examples.mouseFollower.media.image1.description')
                        }}</p>
                </div>

                <div class="card-tilt p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg text-center cursor-pointer border border-green-200 dark:border-green-800"
                    :data-cursor-img="mediaBasePath + 'avatar_2.jpg'">
                    <UIcon name="i-heroicons-camera" class="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                    <h6 class="font-semibold mb-2 text-gray-800 dark:text-gray-200">{{
                        $t('examples.mouseFollower.media.image2.title') }}</h6>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{
                        $t('examples.mouseFollower.media.image2.description')
                        }}</p>
                </div>

                <!-- Sample Video -->
                <div class="card-tilt p-6 bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg text-center cursor-pointer border border-red-200 dark:border-red-800"
                    :data-cursor-video="mediaBasePath + 'sample.mp4'">
                    <UIcon name="i-heroicons-play" class="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                    <h6 class="font-semibold mb-2 text-gray-800 dark:text-gray-200">{{
                        $t('examples.mouseFollower.media.video.title') }}</h6>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{
                        $t('examples.mouseFollower.media.video.description')
                        }}</p>
                </div>
            </div>
        </div>

        <!-- Sticky Effect Section -->
        <div class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{
                $t('examples.mouseFollower.stickyEffects') }}
            </h5>
            <div class="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-8 overflow-hidden border-1 border-current bg-transparent">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div data-cursor-stick
                        class="card-tilt sticky-demo bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold cursor-pointer shadow-lg mx-auto">
                        <span class="text-sm">{{ $t('examples.mouseFollower.sticky.element1') }}</span>
                    </div>

                    <div data-cursor-stick="#stick-target"
                        class="card-tilt text-center cursor-pointer p-4 rounded-lg bg-white dark:bg-gray-700 shadow-md border-1 border-current">
                        <p class="text-gray-700 dark:text-gray-300 mb-3">{{ $t('examples.mouseFollower.sticky.hover') }}
                        </p>
                        <div id="stick-target"
                            class="bg-yellow-400 text-yellow-900 rounded-full w-20 h-20 flex items-center justify-center font-bold mx-auto shadow-md text-sm">
                            {{ $t('examples.mouseFollower.sticky.element2') }}
                        </div>
                    </div>
                </div>

                <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    {{ $t('examples.mouseFollower.sticky.description') }}
                </p>
            </div>
        </div>

        <!-- Skewing Effect Section -->
        <div ref="skewingSection" class="space-y-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-300">{{
                $t('examples.mouseFollower.skewingEffects') }}
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UCard class="card-tilt cursor-pointer text-center border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }" @mouseenter="setSkewing(5)"
                    @mouseleave="removeSkewing()"
                    :data-cursor-text="$t('examples.mouseFollower.cursorText.lightSkewing')">
                    <div class="p-4">
                        <UIcon name="i-heroicons-arrows-right-left" class="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                        <h6 class="font-semibold mb-2">{{ $t('examples.mouseFollower.skewing.light') }}</h6>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{
                            $t('examples.mouseFollower.skewing.lightDesc') }}
                        </p>
                    </div>
                </UCard>

                <UCard class="card-tilt cursor-pointer text-center border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }" @mouseenter="setSkewing(50)"
                    @mouseleave="removeSkewing()"
                    :data-cursor-text="$t('examples.mouseFollower.cursorText.strongSkewing')">
                    <div class="p-4">
                        <UIcon name="i-heroicons-arrows-up-down" class="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                        <h6 class="font-semibold mb-2">{{ $t('examples.mouseFollower.skewing.strong') }}</h6>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{
                            $t('examples.mouseFollower.skewing.strongDesc')
                            }}</p>
                    </div>
                </UCard>

                <UCard class="card-tilt cursor-pointer text-center border-1 border-current bg-transparent" :ui="{
                header: 'px-4 py-4 sm:px-6 border-b-1 border-current',
                body: 'px-4 py-4 sm:px-6'
            }" @mouseenter="setSkewing(100)"
                    @mouseleave="removeSkewing()"
                    :data-cursor-text="$t('examples.mouseFollower.cursorText.extremeSkewing')">
                    <div class="p-4">
                        <UIcon name="i-heroicons-arrows-pointing-out" class="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
                        <h6 class="font-semibold mb-2">{{ $t('examples.mouseFollower.skewing.extreme') }}</h6>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{
                            $t('examples.mouseFollower.skewing.extremeDesc')
                            }}</p>
                    </div>
                </UCard>
            </div>
        </div>

    </div>
</template>

<style scoped>
/* Theme Element Hover Styles */
.theme-element {
    transition: all 0.3s ease;
}

/* Mouse Follower Theme State Styles - Global styles */
:global(.mf-cursor.-theme:before) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

:global(.mf-cursor.-theme .mf-cursor-text) {
    color: #fbbf24 !important;
    font-weight: 600 !important;
}

/* Additional Mouse Follower States */
:global(.mf-cursor.-opaque) {
    opacity: 0.7 !important;
}

:global(.mf-cursor.-custom:before) {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57) !important;
    animation: rainbow 2s ease-in-out infinite alternate !important;
}

/* Rainbow animation for custom state */
@keyframes rainbow {
    0% {
        filter: hue-rotate(0deg);
    }

    100% {
        filter: hue-rotate(360deg);
    }
}
</style>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const mediaBasePath = config.public.mediaBasePath
const mouseSection = ref<HTMLElement>()
const mouseTitle = ref<HTMLElement>()
const interactiveSection = ref<HTMLElement>()
const cardsSection = ref<HTMLElement>()
const textSection = ref<HTMLElement>()
const statesSection = ref<HTMLElement>()
const skewingSection = ref<HTMLElement>()
const configSection = ref<HTMLElement>()

// Reactive data for configuration
const cursorSpeed = ref(0.8)

// Get current MouseFollower instance
const getCursor = () => {
    if (typeof window !== 'undefined') {
        return (window as any).mouseFollower || (window as any).$cursor
    }
    return null
}

// Existing skewing functions
const setSkewing = (factor: number) => {
    const cursor = getCursor()
    if (cursor) {
        cursor.skewing = factor
        cursor.options.skewingDelta = 0.01
        cursor.options.skewingDeltaMax = 1.0
        cursor.render(true)
    }
}

const removeSkewing = () => {
    const cursor = getCursor()
    if (cursor) {
        cursor.skewing = 0
        cursor.options.skewingDelta = 0.001
        cursor.options.skewingDeltaMax = 0.15
        cursor.render(true)
    }
}

// Advanced states functions
const addCustomState = () => {
    const cursor = getCursor()
    if (cursor) {
        cursor.addState('-custom')
    }
}

const removeCustomState = () => {
    const cursor = getCursor()
    if (cursor) {
        cursor.removeState('-custom')
    }
}

// Configuration functions
const updateCursorSpeed = () => {
    const cursor = getCursor()
    if (cursor) {
        // Invert speed: higher value = faster cursor
        cursor.options.speed = 2.1 - cursorSpeed.value
    }
}

onMounted(() => {
    if (!mouseSection.value) return

    const { setupSection, animateTitle, utils } = useAnimations()

    // Setup section
    setupSection(mouseSection)

    // Animate main title
    animateTitle(mouseTitle, mouseSection)

    // Animate sections with cascading effect
    const sections = [
        interactiveSection.value,
        cardsSection.value,
        textSection.value,
        statesSection.value,
        skewingSection.value,
        configSection.value
    ].filter(Boolean)

    sections.forEach((section, index) => {
        if (!section || !utils) return

        // Scale in animation for sections
        if (utils.scaleIn) {
            utils.scaleIn(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                },
                delay: index * 0.1,
                scale: 0.95
            })
        }

        // Animate children with stagger
        if (utils.fadeInUp && section.children.length > 0) {
            utils.fadeInUp(Array.from(section.children), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%'
                },
                stagger: 0.1,
                delay: index * 0.05
            })
        }
    })
})
</script>
