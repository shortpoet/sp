import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for PDF button animations and interactions
 * Handles bounce-in animations, scroll-triggered wiggles, and first-time tooltips
 */
export function usePDFButtonInteractions(options = {}) {
  const {
    scrollTriggerThreshold = 0.6,
    tooltipStorageKey = 'pdf-button-seen',
    tooltipText = 'PDF Download',
    tooltipDuration = 4000,
    initialDelay = 1500
  } = options

  // Reactive state
  const hasScrollTriggered = ref(false)
  const showFirstTimeTooltip = ref(false)
  const buttonRef = ref(null)

  /**
   * Handle scroll events to trigger wiggle animation
   */
  const handleScroll = () => {
    if (!hasScrollTriggered.value && window.scrollY > document.body.scrollHeight * scrollTriggerThreshold) {
      triggerScrollWiggle()
      hasScrollTriggered.value = true
    }
  }

  /**
   * Trigger the wiggle animation on the button
   */
  const triggerScrollWiggle = () => {
    if (buttonRef.value) {
      buttonRef.value.classList.add('scroll-wiggle')
      setTimeout(() => {
        if (buttonRef.value) {
          buttonRef.value.classList.remove('scroll-wiggle')
        }
      }, 500)
    }
  }

  /**
   * Check if this is the user's first time seeing the button
   * Show tooltip if it's their first visit
   */
  const checkFirstTimeVisit = () => {
    const hasVisited = localStorage.getItem(tooltipStorageKey)
    if (!hasVisited) {
      showFirstTimeTooltip.value = true
      localStorage.setItem(tooltipStorageKey, 'true')
      setTimeout(() => {
        showFirstTimeTooltip.value = false
      }, tooltipDuration)
    }
  }

  /**
   * Manually dismiss the tooltip
   */
  const dismissTooltip = () => {
    showFirstTimeTooltip.value = false
  }

  /**
   * Reset scroll trigger (useful for testing or re-enabling)
   */
  const resetScrollTrigger = () => {
    hasScrollTriggered.value = false
  }

  /**
   * Reset first-time tooltip (useful for testing)
   */
  const resetFirstTimeTooltip = () => {
    localStorage.removeItem(tooltipStorageKey)
  }

  // Lifecycle hooks
  onMounted(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check for first-time visit after a delay to let the page settle
    setTimeout(() => {
      checkFirstTimeVisit()
    }, initialDelay)
  })

  onUnmounted(() => {
    // Clean up event listener
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    // Reactive state
    hasScrollTriggered,
    showFirstTimeTooltip,
    buttonRef,
    
    // Methods
    triggerScrollWiggle,
    dismissTooltip,
    resetScrollTrigger,
    resetFirstTimeTooltip,
    
    // Configuration
    tooltipText,
    
    // Internal methods (exposed for testing)
    handleScroll,
    checkFirstTimeVisit
  }
}

/**
 * Pre-configured composable for Resume page PDF button
 */
export function useResumePagePDFButton() {
  return usePDFButtonInteractions({
    tooltipStorageKey: 'pdf-button-seen-resume',
    tooltipText: 'PDF Download'
  })
}

/**
 * Pre-configured composable for PDF page save button
 */
export function usePDFPageSaveButton() {
  return usePDFButtonInteractions({
    tooltipStorageKey: 'pdf-button-seen-pdf-page',
    tooltipText: 'Save PDF'
  })
}