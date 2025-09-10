<template>
  <div
    class="landing-nav-container d-flex flex-row justify-content-across mt-3 mt-lg-0 ps-3 p-lg-5 me-lg-0 me-5">
    <button class="bowton landing-button position-relative" @click="showResume">
      Resume
      <div class="resume-tooltip">View resume with PDF download option</div>
    </button>
    <button class="bowton landing-button position-relative ms-5" @click="openPDF">
      PDF
      <div class="resume-tooltip">Download PDF version of resume</div>
    </button>
    <router-link
      tag="button"
      to="/articles/learning-to-unit-test-en"
      class="bowton landing-button mx-5">
      Articles
    </router-link>
    <a tag="button" :href="demoUrl" class="bowton landing-button"> Demos </a>
  </div>
</template>

<script>
export default {
  name: 'LandingNav',
  data() {
    return {};
  },
  methods: {
    showResume() {
      this.$emit('show-resume');
    },
    openPDF() {
      window.open('/print?print=true', '_blank');
    }
  },
  computed: {
    demoUrl() {
      return import.meta.env.VITE_APP_URL === 'shortpoet.com'
        ? 'https://ssr.shortpoet.com'
        : 'https://ssr-dev.shortpoet.com';
    }
  }
};
</script>

<style scoped>
.resume-tooltip {
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1000;
}

.bowton:hover .resume-tooltip {
  opacity: 1;
}
</style>
