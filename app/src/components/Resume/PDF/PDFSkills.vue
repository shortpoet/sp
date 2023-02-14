<template>
  <section class="resume-section mt-2 ml-0" id="skills">
    <div class="my-auto">
      <h4 style="font-family: 'Saira Extra Condensed';" class="heading heading-4 subheading mb-4 mb-md-3 ml-4">
        Programming Languages &amp; Tools
      </h4>
      <div id="skill-grid-container" class="d-flex flex-column flex-md-row justify-content-between mt-2 mx-5 px-0">
        <div
          v-for="(type, i) in skills"
          :key="i"
          class="skill-grid"
        >
          <div class="list-devicons devicon-row d-flex justify-content-around my-0">
            <PDFDevIcon
              v-for="(icon, i) in mapIcons(type.type)"
              :key="i"
              :source="icon.icon"
              :name="icon.name"
            />
          </div>
          <div class="skill-type d-flex flex-row align-items-center justify-content-around my-2 my-md-0">
            <div>
              <div class="pdf-skill-type" style="font-family: 'Open Sans';">{{ type.type }}</div>
            </div>
          </div>
          <PDFBorder class="d-none d-md-block my-3 my-md-2" :size=".25"/>
          <div class="skill-list-container d-flex flex-column mb-4 mb-md-2">
              <div
                v-for="(skill, i) in listSkills(type.details)"
                :key="i"
                class="skill-list d-flex flex-column mx-2 mb-2"
              >
                <div class="skill-pill-container d-flex justify-content-around">
                  <!-- adding extra spans to create grid -->
                  <span></span>
                  <span style="font-family: 'Open Sans';" class="skill badge badge-pill">
                    {{ skill }}
                  </span>
                  <span></span>
                </div>          
              </div>
          </div>
          <PDFBorder v-if="i !== (skills.length - 1)" class="d-md-none d-block my-3 my-md-2" :marginX="25" :size=".25"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PDFDevIcon from '@/components/Resume/PDF/PDFDevIcon'
import PDFBorder from '@/components/Resume/PDF/PDFBorder'
import icons from '@/assets/icons.js'

export default {
  name: 'PDFSkills',
  props: {
    skills: {
      type: Array
    }
  },
  components: {
    PDFDevIcon,
    PDFBorder
  },
  data () {
    return {
      icons: icons.icons,
      iconMap: icons.iconMap,
      windowWidth: window.innerWidth 
    }
  },
  computed: {
  },
  methods: {
    listSkills(skills) {
      return skills.split(',')
    },
    mapIcons(skill) {
      console.log(skill)
      let iconKeys = this.iconMap.filter(im => im.skill === skill)[0]['icons']
      return iconKeys.map(ik => {
        return this.icons.filter(i => i.name === ik)[0]
      }) 
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
.fa-user-ninja:before {
  font-family: 'Font Awesome 5 Free';
  content: "\f504"; 
  }
</style>