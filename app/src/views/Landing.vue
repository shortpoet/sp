<template>
  <div class="main-wrapper" v-if="getResumeLoaded" id="resume-anchor">
    <StartNav v-if="isResume" />
    <div class="container-fluid p-0">
      <StartAbout :name="getResume.name" :surname="getResume.surname" :email="getResume.email"
        :address="getResume.address" :citizenship="getResume.citizenship" :flags="getResume.flags" />
      <StartSocials :socials="getResume.socials" />
      <LandingNav v-if="!isResume" @show-resume="showResume" />
      <StartSkills :skills="getResume.skills" v-if="isResume" />
      <StartAwards :spokenLanguages="getResume.spokenLanguages" v-if="isResume" />
      <StartObjective :aboutMe="getResume.aboutMe" v-if="isResume" />
      <StartExperience :experiences="getResume.experiences" v-if="isResume" />
      <StartEducation :educations="getResume.educations" v-if="isResume" />
      <StartInterests :interests="getResume.interests" v-if="isResume" />
      <portal-target v-if="isResume" name="pdf-button-float" />
      <StartButtonFloat :target="'pdf-button-float'" :href="'/pdf'" :isExpanded="rippleExpanded"
        @ripple-open="toggleVisibility(true)" @ripple-close="toggleVisibility(false)" />

    </div>

  </div>
</template>

<script>
import StartNav from '@/components/Resume/Start/StartNav.vue'
import LandingNav from '@/components/Landing/LandingNav.vue'
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
// require("bootstrap");
import "bootstrap";
// require("jquery.easing");
import "jquery.easing";

export default {
  name: 'Start',
  components: {
    StartNav,
    LandingNav,
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
      rippleExpanded: false,
      isResume: false
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
    showResume() {
      this.isResume = true
    }
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
    })
  }

}
</script>

<style lang="scss">
// using @ for import doesn't seem to work only relative path
@import './../assets/scss/start.scss';
</style>
