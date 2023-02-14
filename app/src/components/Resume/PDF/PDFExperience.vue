<template>
  <section :class="sectionClass" id="experience">
    <div class="my-auto">
      <h4 class="heading heading-4" style="font-family: 'Saira Extra Condensed';">Experience</h4>
      <div class="d-flex flex-column justify-content-between" v-for="type in experiences" :key="type.type">
        <!-- <h4 class="pdf-subheading mt-2 mb-0">{{ type.type }} Experience</h4> -->
        <div v-for="(job, ji) in type.jobs" :key="ji">
          <div class="d-flex flex-column justify-content-between">
            <div class="d-flex flex-row">
              <div class="mr-auto">
                <h5 id="job-position" style="font-family: 'Saira Extra Condensed';" class="heading heading-5 mb-0">{{ job.position }}</h5>
              </div>
              <div :class="textRightClass">
                <h6 style="font-family: 'Saira Extra Condensed';" class="heading heading-6 pdf-experience-dates text-primary">{{ job.startDate }} - {{ job.endDate }}</h6>
              </div>
            </div>
            <div class="d-flex flex-column">
              <h6 style="font-family: 'Saira Extra Condensed';" class="heading heading-6 pdf-company">{{ job.company }}</h6>
              <div
                v-for="(text, di) in job.description.split('\\n\\r')"
                :key="di"
                class="mb-2"
              >
                <p style="font-family: 'Open Sans';" v-html="text" :class="'job-' + (ji + 1) + '-description-' + (di + 1)"></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'PDFExperience',
  props: {
    experiences: {
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
    },
    textRightClass () {
      return this.renderPDF ?
        'resume-date text-md-right mr-1'
        :
        'resume-date text-md-right mr-4'
    }
  }
}
</script>
