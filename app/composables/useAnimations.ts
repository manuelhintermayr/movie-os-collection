import type { Ref } from 'vue'

export interface AnimationOptions {
  scrollTrigger?: {
    trigger?: string | Element
    start?: string
    end?: string
    toggleActions?: string
  }
  stagger?: number
  delay?: number
  duration?: number
  scale?: number
  y?: number
  opacity?: number
  ease?: string
}

export interface AnimationUtils {
  fadeInUp: (elements: string | Element | Element[], options?: AnimationOptions) => any
  scaleIn: (elements: string | Element | Element[], options?: AnimationOptions) => any
  heroEntrance: (container: string | Element) => any
  addCardEffects: (cards: string | Element | Element[]) => void
  addMagneticEffect: (elements: string | Element | Element[]) => void
  addTiltToAllCards: () => void
}

export interface UseAnimationsReturn {
  utils: AnimationUtils | null
  isReady: boolean
  // Convenience methods
  setupSection: (sectionRef: Ref<HTMLElement | undefined>, options?: {
    removeLoading?: boolean
    autoTilt?: boolean
  }) => void
  animateTitle: (titleRef: Ref<HTMLElement | undefined>, triggerRef?: Ref<HTMLElement | undefined>) => void
  animateCards: (cardsRef: Ref<HTMLElement[]>, triggerRef?: Ref<HTMLElement | undefined>) => void
  animateButtons: (buttonsSelector: string, containerRef: Ref<HTMLElement | undefined>) => void
  animateStaggered: (elements: Element[] | string, triggerRef?: Ref<HTMLElement | undefined>, options?: AnimationOptions) => void
}

export const useAnimations = (): UseAnimationsReturn => {
  const { $animationUtils } = useNuxtApp()

  const utils = computed(() => {
    if ($animationUtils && typeof $animationUtils === 'object') {
      return $animationUtils as AnimationUtils
    }
    return null
  })

  const isReady = computed(() => !!utils.value)

  // Setup a section with common patterns
  const setupSection = (
    sectionRef: Ref<HTMLElement | undefined>,
    options: { removeLoading?: boolean; autoTilt?: boolean } = {}
  ) => {
    const { removeLoading = true, autoTilt = true } = options

    if (!sectionRef.value || !utils.value) return

    if (removeLoading) {
      sectionRef.value.classList.remove('gsap-loading')
    }

    if (autoTilt) {
      utils.value.addTiltToAllCards()
    }
  }

  // Animate a title element
  const animateTitle = (
    titleRef: Ref<HTMLElement | undefined>,
    triggerRef?: Ref<HTMLElement | undefined>
  ) => {
    if (!titleRef.value || !utils.value?.fadeInUp) return

    utils.value.fadeInUp(titleRef.value, {
      scrollTrigger: {
        trigger: triggerRef?.value || titleRef.value,
        start: 'top 85%'
      }
    })
  }

  // Animate cards with stagger
  const animateCards = (
    cardsRef: Ref<HTMLElement[]>,
    triggerRef?: Ref<HTMLElement | undefined>
  ) => {
    if (!cardsRef.value?.length || !utils.value?.fadeInUp) return

    utils.value.fadeInUp(cardsRef.value, {
      scrollTrigger: {
        trigger: triggerRef?.value || cardsRef.value[0]?.parentElement || undefined,
        start: 'top 80%'
      },
      stagger: 0.15
    })

    // Add interactive effects
    if (utils.value.addCardEffects) {
      nextTick(() => {
        if (utils.value?.addCardEffects) {
          utils.value.addCardEffects(cardsRef.value)
        }
      })
    }
  }

  // Animate buttons with scale and magnetic effects
  const animateButtons = (
    buttonsSelector: string,
    containerRef: Ref<HTMLElement | undefined>
  ) => {
    if (!containerRef.value || !utils.value) return

    const buttons = Array.from(containerRef.value.querySelectorAll(buttonsSelector))
    if (!buttons.length) return

    // Scale in animation
    if (utils.value.scaleIn) {
      utils.value.scaleIn(buttons, {
        scrollTrigger: {
          trigger: containerRef.value,
          start: 'top 80%'
        },
        stagger: 0.1,
        scale: 0.9
      })
    }

    // Add magnetic effects
    if (utils.value.addMagneticEffect) {
      nextTick(() => {
        if (utils.value?.addMagneticEffect) {
          utils.value.addMagneticEffect(buttons)
        }
      })
    }
  }

  // Generic staggered animation
  const animateStaggered = (
    elements: Element[] | string,
    triggerRef?: Ref<HTMLElement | undefined>,
    options: AnimationOptions = {}
  ) => {
    if (!utils.value?.fadeInUp) return

    const defaultOptions: AnimationOptions = {
      scrollTrigger: {
        trigger: triggerRef?.value,
        start: 'top 80%'
      },
      stagger: 0.1,
      ...options
    }

    utils.value.fadeInUp(elements, defaultOptions)
  }

  return {
    utils: utils.value,
    isReady: isReady.value,
    setupSection,
    animateTitle,
    animateCards,
    animateButtons,
    animateStaggered
  }
}
