<template>
  <div id="pdf-print-container" v-if="getResumeLoaded">
      <div class="p-10">
      <PDFAbout :name="getResume.name" :surname="getResume.surname" :email="getResume.email" :address="getResume.address"
        :citizenship="getResume.citizenship" :flags="getResume.flags" :renderPDF="true"
        :socials="getResume.socials" />
      <PDFBorder class="my-2" :size=".25" />

      <div class="skills-awards-subcontainer-render">
        <PDFAwards :renderPDF="true" :spokenLanguages="getResume.spokenLanguages" />
        <PDFSkillsRender :skills="getResume.skills" />
      </div>

      <div class="row">
        <PDFObjective :renderPDF="true" :aboutMe="getResume.aboutMe" />
      </div>

      <PDFExperience :renderPDF="true" :experiences="getResume.experiences" />
      <PDFEducation :renderPDF="true" :educations="getResume.educations" />
      <div id="interests-poem-container" class="row mb-5">
        <div id="interests-container" class="col-12">
          <PDFInterests :interests="getResume.interests" :renderPDF="true" />
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'PDFPrint',
  // Set page title via head manager so Safari and other browsers honor it.
  // We intentionally avoid imperative document.title mutations.
  setup() {
    const route = useRoute()
    const printTitle = computed(() => {
      const t = route.query.title
      if (typeof t === 'string') {
        try { return decodeURIComponent(t) } catch { return t }
      }
      return 'Carlos_Soriano_Resume'
    })
    // Override any global title template; use provided title as-is
    useHead({ title: printTitle, titleTemplate: null })
    return {}
  },
  computed: {
    ...mapGetters('resume', ['getResume', 'getResumeLoaded'])
  },
  methods: {
    ...mapActions(['loadEnv']),
    ...mapActions('resume', ['loadResume'])
  },
  async mounted() {
    const env = import.meta.env.NODE_ENV
    this.loadEnv(env)
    await this.loadResume()
    // Auto-trigger print if query param present
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('print') === 'true') {
      setTimeout(() => window.print(), 750)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,600,700');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i');
@import './../assets/scss/pdf.scss';

// Screen styles - preview mode
@media screen {
  #pdf-print-container {
    max-width: 210mm;
    margin: 0 auto;
    padding: 20px;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    font-family: 'Open Sans', -apple-system, sans-serif;
  }
}

// Print styles - actual PDF generation
@media print {
  @page {
    size: A4;
    margin: 0; // Minimize space for browser headers/footers
  }
  
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', -apple-system, sans-serif;
  }
  
  #pdf-print-container {
    width: 100%;
    margin: 0;
    padding: 0.5in; // Add padding to content instead of page margin
  }
  
  
  // Hide UI elements
  nav, footer, .modal, button, .no-print {
    display: none !important;
  }
  
  // Prevent page breaks inside elements
  h1, h2, h3, h4, h5, h6,
  .experience-item,
  .education-item,
  .skill-group {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
