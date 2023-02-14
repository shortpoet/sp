<template>
  <section :class="sectionClass" id="pdf-objective">
    <div class="d-flex align-items-center" id="objective">
      <h4 style="font-family: 'Saira Extra Condensed';" class="heading heading-4">
        Objective
      </h4>
    </div>

    <div class="d-flex align-items-center" id="objective">
      <div class="resume-item d-flex flex-column justify-content-between">
        <div
          v-for="(text, i) in aboutMe.split('\\n\\r')"
          :key="i"
          class="aboutme-paragraph mb-2 mb-md-1"
          style="font-family: 'Open Sans';"  
        >
        <!-- if text contains markup -->
        <p v-if="!text.match(/\<.+\/\>|\<\/.+\>/g)">
          {{ text }}
        </p>
        <p v-else v-html="text"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PDFObjective',
  components: {
  },
  props: {
    aboutMe: {
      type: String
    },
    renderPDF: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pdfUrl: window.location.protocol + '//' + window.location.host + '/pdf',
    }
  },
  computed: {
    sectionClass () {
      return this.renderPDF ?
        'resume-section-render mb-3'
        :
        'resume-section mb-3'
    }
  }
}
</script>
