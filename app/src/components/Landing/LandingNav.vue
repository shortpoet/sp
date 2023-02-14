<template>
  <div class="landing-nav-container d-flex flex-row justify-content-across mt-3 mt-lg-0 pl-3 p-lg-5 mr-lg-0 mr-5">
    <button class="bowton landing-button" @click="showResume">Resume</button>
    <router-link tag="button" to="/articles/learning-to-unit-test-en" class="bowton landing-button mx-5">Articles</router-link>
  </div>
</template>

<script>
export default {
  name: 'LandingNav',
  data () {
    return {
    }
  },
  methods: {
    showResume() {
      this.$emit('show-resume')
    }
  }
}
</script>
