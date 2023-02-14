<template>
  <section :class="sectionClass" id="education">
    <div class="my-auto">
      <h4 style="font-family: 'Saira Extra Condensed';" class="heading heading-4 pdf-subheading">Education</h4>
      <div v-for="(ed, i) in educations" :key="i">
        <div class="resume-item d-flex flex-column justify-content-between">
          <div class="d-flex flex-row">
            <div class="resume-content mr-5 mr-md-auto">
              <h5 style="font-family: 'Saira Extra Condensed';" class="mb-0">{{ ed.institution }}</h5>
            </div>
            <div class="resume-date text-md-right mr-4">
              <h6 style="font-family: 'Saira Extra Condensed';" class="pdf-education-focus text-primary">{{ ed.focus }}</h6>
            </div>
          </div>
          <div class="d-flex flex-column">
            <h6 style="font-family: 'Saira Extra Condensed';" class="heading heading-6 pdf-degree">{{ ed.degree }}</h6>
            <p style="font-family: 'Open Sans';" class="resume-content">{{ ed.details }}</p>
            <!-- <p>GPA: 3.23</p> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PDFEducation',
  props: {
    educations: {
      type: Array
    },
    renderPDF: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sectionClass () {
      return this.renderPDF ?
        'resume-section-render ml-3 mt-2 mb-3'
        :
        'resume-section ml-3 mt-2 mb-3'
    }
  }
}
</script>
