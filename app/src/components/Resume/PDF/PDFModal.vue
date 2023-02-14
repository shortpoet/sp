<script>
//https://alligator.io/vuejs/vue-modal-component/

  export default {
    name: 'PDFModal',
    methods: {
      close() {
        this.$emit('close');
      },
      toPDF() {
        this.$emit('to-pdf');
      },
      toPage() {
        this.$emit('to-page');
      },
      /* istanbul ignore next */
      toCanvas() {
        this.$emit('to-canvas');
      }
    },
  };
</script>
<template>
  <transition name="modal-fade">
    <div class="custom-modal-backdrop" @click="close">
      <div class="custom-modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="custom-modal-header"
          id="modalTitle"
        >
          <slot name="header">
            <h4 class="heading heading-4 mr-auto">Save to PDF</h4>
            <button
              type="button"
              class="btn-ex"
              @click="close"
              aria-label="Close modal"
            >
              <font-awesome-icon icon="times" />
            </button>
          </slot>
        </header>
        <section
          class="custom-modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <p>
              This does not <em>download</em> a file in the traditional sense where it is retrieved from a data server. 
              It is generated fresh by your browser based on a <b>snapshot</b> of this page as you see it. 
            </p>
            <p>
              <span class="saveme-text">Save Me!</span> - actual aspect ratio.
            </p>
            <p>
              <span class="pageme-text">Page Me!</span> - A4 format and pagination.
            </p>
          </slot>
        </section>
        <footer class="custom-modal-footer">
          <slot name="footer">
            <div class="button-drawer d-flex flex-row justify-content-around">
              <div>
                <button
                  type="button"
                  class="btn-save"
                  @click="toPDF"
                  aria-label="resume to screenshot pdf"
                >
                  Save me!
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="btn-page"
                  @click="toPage"
                  aria-label="resume to paginated pdf"
                >
                  Page me!
                </button>
              </div>
              <div>
                <a href="/">
                <button
                  type="button"
                  class="btn-close"
                  @click="close"
                  aria-label="Close modal"
                >
                  Home Page 
                </button>
                </a>
              </div>
            </div>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style lang="scss">
</style>
