<template>
  <section :class="sectionClass" id="interests">
    <div class="my-auto">
      <h4 style="font-family: 'Saira Extra Condensed';" class="heading heading-4 mb-3">Interests</h4>
      <p style="font-family: 'Open Sans';">{{ interests }}</p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'PDFInterests',
  props: {
    interests: {
      type: String
    },
    renderPDF: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sectionClass() {
      return this.renderPDF ?
        'resume-section-render mt-2 mb-3'
        :
        'resume-section ms-3 mt-2 mb-3'
    }
  }
}
</script>

<style scoped>
#interests {
  align-items: center;
}

.short-poetry {
  height: 50%;
  width: 50%;
}

.embed-container {
  position: relative;
  padding-bottom: 150%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}

.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
