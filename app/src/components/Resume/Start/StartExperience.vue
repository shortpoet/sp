<template>
  <section class="resume-section p-3 px-lg-5 d-flex flex-column" id="experience">
    <div class="my-auto">
      <h2 class="heading heading-2 start-experience-header mb-4 mb-md-3">Experience</h2>
      <div class="resume-item d-flex flex-column mb-2" v-for="type in experiences" :key="type.type">
        <h2 class="heading heading-2 start-experience-type mb-3">{{ type.type }}</h2>
        <div class="resume-item d-flex flex-column flex-md-row mb-3" v-for="(job, ji) in type.jobs" :key="ji">
          <div class="resume-content mr-auto">
            <h3 class="heading heading-3 mb-0">{{ job.position }}</h3>
            <div class="start-company subheading mb-3">{{ job.company }}</div>
              <div
                v-for="(text, di) in job.description.split('\\n\\r')"
                :key="di"
              >
              <p v-html="text" :class="'job-' + (ji + 1) + '-description-' + (di + 1)"></p>
              </div>
          </div>
          <div class="resume-date text-md-right mt-1">
            <span v-if="hasDate(job.startDate)" class="text-primary">{{ job.startDate }} - {{ job.endDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
    name: 'StartExperience',
    props: {
      experiences: {
        type: Array
      }
    },
    methods: {
      hasDate: (date) => date !== '' && date !== null && date !== undefined
    }
}
</script>
