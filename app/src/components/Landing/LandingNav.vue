<template>
  <div class="landing-nav-container d-flex flex-row justify-content-across mt-3 mt-lg-0 ps-3 p-lg-5 me-lg-0 me-5">
    <button class="bowton landing-button" @click="showResume">
      Resume
    </button>
    <router-link tag="button" to="/articles/learning-to-unit-test-en" class="bowton landing-button mx-5">
      Articles
    </router-link>
    <a tag="button" :href="demoUrl" class="bowton landing-button mr-5">
      Demos
    </a>
  </div>
</template>

<script>
export default {
  name: 'LandingNav',
  data() {
    return {
    }
  },
  methods: {
    showResume() {
      this.$emit('show-resume')
    }
  },
  computed: {
    demoUrl() {
      return import.meta.env.VITE_APP_URL === 'shortpoet.com' ?
        'https://ssr.shortpoet.com' : 'https://ssr-dev.shortpoet.com'
    }
  }
}
</script>
