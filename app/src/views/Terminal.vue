<template>
  <div class="terminal-container">
    <div class="ui-container">

      <div class="title-bar">carlos@shortpoet: ~</div>

      <div class="code-container">
        <div @click="navigate('/resume')" class="clickable-area">
          <p>> cd Resume</p>
          <p>></p>
          <p>></p>
          <p>></p>
        </div>
        <div @click="navigate('/blog')" class="clickable-area">
          <p>> cd Blog</p>
          <p>></p>
          <p>></p>
          <p>></p>
        </div>
      </div>
      <div class="ui-instruction">
        *cd => change directory / navigate
      </div>

    </div>


  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Landing',
  components: {
    
  },
  methods: {
    ...mapActions(['loadEnv']),
    navigate(route) {
      this.$router.push(route)
    }
  },
  mounted () {
    // this.loadEnv()
  }
}
</script>

<style lang="scss">
@import './../assets/scss/landing.scss';

</style>