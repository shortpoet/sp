<template>
  <section class="resume-section p-3 px-lg-5 d-flex d-column mb-4 mb-md-3" id="start-objective">
    <div class="aboutme-container">
      <div
        v-for="(text, i) in aboutMe.split('\\n\\r')"
        :key="i"
        class="aboutme-paragraph lead"
      >
      <!-- if text contains markup -->
      <p v-if="!text.match(/\<.+\/\>|\<\/.+\>/g)">
        {{ text }}
      </p>
      <p v-else v-html="text"></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StartObjective',
  components: {
  },
  props: {
    aboutMe: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    // breakMe () {
    //   console.log(this.aboutMe.replace('\\n\\r', '<br />'))
    //   return this.name.replace('\\n\\r', '<br />')
    // }
  }
}
</script>
