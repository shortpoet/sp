<script>
export default {
  name: 'PDFModal',
  methods: {
    close() {
      this.$emit('close');
    },
    printPDF() {
      this.$emit('print-pdf');
    }
  }
};
</script>

<template>
  <transition name="modal-fade">
    <div class="custom-modal-backdrop" @click="close">
      <div
        class="custom-modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">
        <header class="custom-modal-header" id="modalTitle">
          <h4 class="heading-pdf heading-4 me-auto">Download PDF Resume</h4>
          <button
            type="button"
            class="btn-ex"
            @click="close"
            aria-label="Close modal">
            <font-awesome-icon icon="times" />
          </button>
        </header>

        <section class="custom-modal-body" id="modalDescription">
          <p>
            Click below to download a professional PDF version of this resume.
          </p>
          <p>
            Your PDF will open in a new window where you can save it directly.
          </p>

          <div class="coming-soon-box mt-4 p-3 border rounded">
            <p class="mb-2"><strong>Coming Soon:</strong></p>
            <p class="mb-0">
              Enhanced PDF generation via Cloudflare Workers with multiple 
              format options for different use cases (ATS-friendly, designed, 
              plain text). Keep an eye out! 😉
            </p>
          </div>
        </section>

        <footer class="custom-modal-footer">
          <div class="button-drawer d-flex flex-row justify-content-center">
            <button
              type="button"
              class="btn btn-primary"
              @click="printPDF"
              aria-label="Download PDF resume">
              Download PDF
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.coming-soon-box {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.custom-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.custom-modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.125);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.custom-modal-header {
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
}

.custom-modal-body {
  padding: 20px;
  flex-grow: 1;
}

.custom-modal-footer {
  padding: 15px;
  border-top: 1px solid #dee2e6;
}

.btn-ex {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
