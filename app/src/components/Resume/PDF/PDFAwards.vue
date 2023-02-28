<template>
  <section :class="sectionClass" id="awards">
    <div class="my-auto">
      <h4 style="font-family: 'Saira Extra Condensed';" :class="headingClass">Natural Languages</h4>
      <div :class="gridClass">
        <span v-for="(lang, i) in spokenLanguages" :key="i" :class="typeClass">
          <i :class="lang.type + ' language-icon fa fa-flag mb-auto me-2'"></i>
          <span style="font-family: 'Open Sans';" class="">{{ `${lang.languages} (${recase(lang.type)})` }} </span>
        </span>
        <span class="language-type-render d-flex">
          <i class="award-icon fa fa-trophy mb-auto me-2"></i>
          <span style="font-family: 'Open Sans';">Certified Interpreter</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import _recase from '@/utils/recase.js'
export default {
  name: 'PDFAwards',
  props: {
    spokenLanguages: {
      type: Array
    },
    renderPDF: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sectionClass() {
      return this.renderPDF ?
        'resume-section-render me-2 mt-2'
        :
        'resume-section ms-4 mt-2'
    },
    gridClass() {
      return this.renderPDF ?
        'd-flex flex-row justify-content-around'
        :
        'd-flex flex-column ms-1'
    },
    headingClass() {
      return this.renderPDF ?
        'heading-pdf heading-4 mb-2'
        :
        'heading-pdf heading-4 mb-4 ms-1'
    },
    typeClass() {
      return this.renderPDF ?
        'language-type-render d-flex'
        :
        'd-flex'
    }
  },
  methods: {
    recase(input) {
      return _recase(input)
    }
  },
  mounted() {
    // console.log(this)
  }
}
</script>
