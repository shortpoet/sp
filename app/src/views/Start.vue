<template>
  <div class="main-wrapper" v-if="getResumeLoaded" id="resume-anchor">
    <StartNav />
    <div class="container-fluid p-0">
      <StartAbout :name="getResume.name" :surname="getResume.surname" :email="getResume.email"
        :address="getResume.address" :citizenship="getResume.citizenship" :flags="getResume.flags" />
      <StartSocials :socials="getResume.socials" />
      <StartSkills :skills="getResume.skills" />
      <StartAwards :spokenLanguages="getResume.spokenLanguages" />
      <StartObjective :aboutMe="getResume.aboutMe" />
      <StartExperience :experiences="getResume.experiences" />
      <StartEducation :educations="getResume.educations" />
      <StartInterests :interests="getResume.interests" />

      <portal-target class="start-target" name="pdf-button-float" />
      <StartButtonFloat :target="'pdf-button-float'" :href="'/pdf'" :isExpanded="rippleExpanded"
        @ripple-open="toggleVisibility(true)" @ripple-close="toggleVisibility(false)" />

    </div>

  </div>
</template>

<script>
import StartNav from '@/components/Resume/Start/StartNav.vue'
import StartAbout from '@/components/Resume/Start/StartAbout.vue'
import StartSocials from '@/components/Resume/Start/StartSocials.vue'
import StartSkills from '@/components/Resume/Start/StartSkills.vue'
import StartObjective from '@/components/Resume/Start/StartObjective.vue'
import StartExperience from '@/components/Resume/Start/StartExperience.vue'
import StartEducation from '@/components/Resume/Start/StartEducation.vue'
import StartInterests from '@/components/Resume/Start/StartInterests.vue'
import StartAwards from '@/components/Resume/Start/StartAwards.vue'
import StartButtonFloat from '@/components/Resume/Start/StartButtonFloat.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Start',
  components: {
    StartNav,
    StartAbout,
    StartSocials,
    StartSkills,
    StartObjective,
    StartExperience,
    StartEducation,
    StartInterests,
    StartAwards,
    StartButtonFloat
  },
  data() {
    return {
      rippleExpanded: false
    }
  },
  computed: {
    ...mapGetters('resume', ['getResume', 'getResumeLoaded']),
  },
  methods: {
    ...mapActions(['loadEnv']),
    ...mapActions('resume', ['loadResume']),
    toggleVisibility(args) {
      if (args) {
        this.rippleExpanded = !this.rippleExpanded
      } else {
        this.rippleExpanded = args
      }
    },
  },
  mounted() {
    const env = import.meta.envNODE_ENV
    this.loadEnv(env)
    this.$nextTick(() => {
      // Activate scrollspy to add active class to navbar items on scroll
      const ss = new this.bootstrap.ScrollSpy(document.body, {
        target: '#sideNav',
        // offset: 72
      })
      this.loadResume()
      // this never logs... why?
      // console.log('Start mounted')
      // console.log(this.getResume)
    })
  }

}
</script>

<style lang="scss">
// using @ for import doesn't seem to work only relative path
@import './../assets/scss/start.scss';
</style>
