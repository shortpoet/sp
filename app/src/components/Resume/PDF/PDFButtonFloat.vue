<template>
  <portal :to="target">
    <div class="button-float-container">
      <div ref="buttonRef" class="button-float" @click="showModal">
        <font-awesome-layers class="button-float-icon-layer fa-lg">
          <font-awesome-icon
            class="button-float-icon-circle"
            size="2x"
            icon="circle" />
          <font-awesome-icon
            class="button-float-icon"
            size="2x"
            :transform="_icon.transform"
            :icon="_icon.icon" />
        </font-awesome-layers>
      </div>
      <div
        v-if="showFirstTimeTooltip"
        class="first-time-tooltip"
        @click="dismissTooltip">
        <div class="tooltip-arrow"></div>
        <span>{{ tooltipText }}</span>
      </div>
    </div>
    <div class="modal-slot">
      <PDFModal
        v-show="isModalVisible"
        @close="closeModal"
        @print-pdf="printPDF" />
    </div>
  </portal>
</template>

<script>
import PDFModal from '@/components/Resume/PDF/PDFModal.vue';
import { usePDFPageSaveButton } from '@/composables/usePDFButtonInteractions';
import { usePDFGeneration } from '@/composables/usePDFGeneration';

export default {
  name: 'PDFButtonFloat',
  components: {
    PDFModal
  },
  props: {
    target: {
      type: String
    },
    icon: {
      type: String
    },
    pdfTarget: {
      type: String
    }
  },
  setup() {
    const {
      hasScrollTriggered,
      showFirstTimeTooltip,
      buttonRef,
      dismissTooltip,
      tooltipText
    } = usePDFPageSaveButton();

    const { openPDFPrint } = usePDFGeneration();

    return {
      hasScrollTriggered,
      showFirstTimeTooltip,
      buttonRef,
      dismissTooltip,
      tooltipText,
      openPDFPrint
    };
  },
  data() {
    return {
      iconMap: {
        save: {
          icon: 'save',
          transform: 'shrink-5 right-1'
        }
      },
      isModalVisible: false
    };
  },
  computed: {
    _icon() {
      return this.iconMap[this.icon];
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    printPDF() {
      this.openPDFPrint();
      this.closeModal();
    }
  }
};
</script>

<style lang="scss">
@keyframes bounce-in {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
    box-shadow: 0 0 20px rgba(11, 102, 35, 0.6);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
}

@keyframes gentle-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes breathing {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
}

@keyframes scroll-wiggle {
  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(-3deg) scale(1.1);
  }
  75% {
    transform: rotate(3deg) scale(1.1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.button-float-container {
  position: relative;
}

.button-float {
  // Initial bounce animation on page load
  animation: bounce-in 1.5s ease-out;
  animation-delay: 1s;
  animation-fill-mode: both;
  cursor: pointer;

  // Layered animations: bounce-in first, then breathing continuously
  &:not(:hover) {
    animation-name: bounce-in, breathing;
    animation-duration: 1.5s, 4s;
    animation-delay: 1s, 3s;
    animation-iteration-count: 1, infinite;
    animation-timing-function: ease-out, ease-in-out;
    animation-fill-mode: both, forwards;
  }

  // Scroll wiggle effect
  &.scroll-wiggle {
    animation: scroll-wiggle 0.5s ease-in-out !important;
  }

  // Enhanced hover state
  &:hover {
    animation: none !important;
    opacity: 1 !important;
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
}

.first-time-tooltip {
  position: absolute;
  bottom: 120%;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10001;
  animation: fadeIn 0.3s ease-in;
  cursor: pointer;

  .tooltip-arrow {
    position: absolute;
    top: 100%;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(0, 0, 0, 0.8);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
}
</style>
