<template>
  <section class="resume-section p-3 px-lg-5 d-flex flex-column" id="education">
    <div class="my-auto">
      <h2 class="heading heading-2 mb-4">Education</h2>
      <div class="resume-item d-flex flex-column flex-md-row mb-4" v-for="(ed, i) in educations" :key="i">
        <div class="resume-content mr-auto">
          <h3 class="heading heading-3 mb-0">{{ ed.institution }}</h3>
          <div class="start-degree subheading mb-3">{{ ed.degree }}</div>
          <div class="start-education-details">{{ ed.details }}</div>
          <!-- <p>GPA: 3.23</p> -->
        </div>
        <div class="resume-date text-md-right mt-1">
          <span class="text-primary">{{ ed.focus }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StartEducation',
  props: {
    educations: {
      type: Array
    }
  }
}
</script>
