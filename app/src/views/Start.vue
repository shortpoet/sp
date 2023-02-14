<template>
  <div class="main-wrapper" v-if="getResumeLoaded" id="resume-anchor">
    <StartNav />
    <div class="container-fluid p-0">
      <StartAbout
        :name="getResume.name"
        :surname="getResume.surname"
        :email="getResume.email"
        :address="getResume.address"
        :visas="getResume.visas"
        :flags="getResume.flags"
      />
      <StartSocials 
        :socials="getResume.socials"
      />
      <StartSkills
        :skills="getResume.skills"
      />
      <StartAwards
        :spokenLanguages="getResume.spokenLanguages"
      />
      <StartObjective
        :aboutMe="getResume.aboutMe"
      />
      <StartExperience
        :experiences="getResume.experiences"      
      />
      <StartEducation
        :educations="getResume.educations"
      />
      <StartInterests
        :interests="getResume.interests"
      />

      <portal-target class="start-target" name="pdf-button-float"/>
      <StartButtonFloat :target="'pdf-button-float'" :href="'/pdf'" :isExpanded="rippleExpanded"  @ripple-open="toggleVisibility(true)" @ripple-close="toggleVisibility(false)" />      

    </div>

  </div>
</template>

<script>
import StartNav from '@/components/Resume/Start/StartNav.vue'
import StartAbout from '@/components/Resume/Start/StartAbout'
import StartSocials from '@/components/Resume/Start/StartSocials'
import StartSkills from '@/components/Resume/Start/StartSkills'
import StartObjective from '@/components/Resume/Start/StartObjective'
import StartExperience from '@/components/Resume/Start/StartExperience'
import StartEducation from '@/components/Resume/Start/StartEducation'
import StartInterests from '@/components/Resume/Start/StartInterests'
import StartAwards from '@/components/Resume/Start/StartAwards'
import StartButtonFloat from '@/components/Resume/Start/StartButtonFloat'
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
  data () {
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
    toggleVisibility (args) {
      if (args) {
        this.rippleExpanded = !this.rippleExpanded
      } else {
        this.rippleExpanded = args
      }
    },
  },
  mounted () {
    const env = process.env.NODE_ENV
    this.loadEnv(env)
    this.$nextTick(() => {
      // Activate scrollspy to add active class to navbar items on scroll
      this.$('body').scrollspy({
        target: '#sideNav'
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
