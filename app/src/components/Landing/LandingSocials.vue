<template>
  <!-- TODO set fontFamily only on icon not text - only req'd on pdf -->
  <section class="resume-section pl-3 pl-lg-5 py-1 mt-3 d-flex d-column" id="start-socials">
    <div class="my-auto">
      <ul class="list-inline list-social-icons mb-0 mt-0">
        <li
          :style="{fontFamily: 'FontAwesome'}"
          class="social-item list-inline-item "
          v-for="(social, i) in socialsComputed"
          :key="i"
        >
          <a :href="social.url">
             <span class="fa-stack fa-lg">
              <i class="fa fa-circle fa-stack-2x"></i>
              <!-- <i :class="'fa fa-' + social.social + ' fa-stack-1x fa-inverse'"></i> -->
              <i :class="social.icon + ' fa-stack-1x fa-inverse'"></i>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
    name: 'LandingSocials',
    components: {
    },
    props: {
      socials: {
        type: Array
      }
    },
    data () {
      return {
        socialsData: [
          {
            social: 'github',
            icon: 'fa fa-github',
            transform: 'shrink-5'
          },
          {
            social: 'linkedin',
            icon: 'fa fa-linkedin',
            transform: 'shrink-6 right-1'
          },
          {
            social: 'instagram',
            icon: 'fa fa-instagram',
            transform: 'shrink-5 right-1'
          },
          {
            social: 'twitter',
            icon: 'fa fa-twitter',
            transform: 'shrink-6'
          },
          {
            social: 'website',
            icon: 'fa fa-home',
            url: '/',
            // for router-link version to test built dist
            // url: '/pdf',
          }
        ]
      }
    },
    computed: {
      availableSocials() {
        let providerNames = this.socials.map(s => s.provider)
        return this.socialsData.filter(social => providerNames.includes(social.social))
          // filter out null entries first if not including in that version
          // can't use break in map reduce forEach but can filter first
          // or could use simple for loop with iterator
      },
      socialsComputed() {
        return this.availableSocials
          .map(availableSocial => {
            // this allows to override by hardcoding here
            if (availableSocial.url === undefined) {
              this.socials.forEach(social => {
                if (social.provider === availableSocial.social) {
                  availableSocial.url = social.url
                }
              })
            }
            return availableSocial
          })
      }
    }
}
</script>
