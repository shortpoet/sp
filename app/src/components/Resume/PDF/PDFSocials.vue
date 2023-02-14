<template>
  <section class="" id="pdf-socials">
    <ul class="list-inline list-social-icons mb-0 mt-0 mr-lg-2">
      <li
        class="social-item"
        v-for="(social, i) in socialsComputed"
        :key="i"
      >
        <a :href="social.url">
          <span :style="iconStyleObject" class="social-icon-layer fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <!-- <i :class="'fa fa-' + social.social + ' fa-stack-1x fa-inverse'"></i> -->
            <i :class="'social-icon ' + social.icon + ' fa-stack-1x fa-inverse'"></i>
          </span>
          <span style="font-family: 'Open Sans'; font-size: .55rem" v-if="!social.social.includes('website')" :class="urlClass">{{social.url}}</span>
          <span style="font-family: 'Open Sans'; font-size: .55rem" v-else :class="urlClass">https://shortpoet.com</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PDFSocials',
  components: {
  },
  props: {
  renderPDF: {
    type: Boolean,
    default: false
  },
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
          transform: 'shrink-6 right-2.5'
        }
      ]
    }
  },
  computed: {
    urlClass () {
      return this.renderPDF ?
      'social-url d-inline'
      :
      'social-url d-none d-md-inline'
    },
    iconStyleObject () {
      return this.renderPDF ?
      {
        fontFamily: 'FontAwesome',
        fontSize: '.65rem'
      }
      :
      {
        fontFamily: 'FontAwesome',
        fontSize: '.85rem'
      }
    },
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
  },
  methods: {
  }
}
</script>
