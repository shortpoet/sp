<template>
  <Head>
    <!-- <html lang="en" dir="ltr" class="mod" style="background-color: ghostwhite;" /> -->
    <!-- <component is="style">
      h1 {
      color: seagreen;
      }
    </component> -->
  </Head>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Head } from '@vueuse/head'
export default {
  name: 'App',
  components: {
    Head,
  },
  setup() {
    const title = 'Carlos Soriano'
    const author = 'Carlos Soriano'
    const description = `#
      Carlos Soriano's Resume and Blog. Through living, studying and, working internationally, I have developed an expertise
      in language and culture. Considering where spoken languages intersect with data got me interested in programming.
      Software engineering is translating business requirements into solutions.
      I apply my advanced tech skills to analyses that consider where culture and computation converge. This, combined with my fluency
      for the most widely spoken languages, allows me to engineer unique solutions to diverse problems.
      I am eager to collaborate with highly motivated and experienced teams whose constant curiosity is tempered by a drive to produce excellent work.
      #`
    const keywords = `#
      Software Engineer, Full Stack, Web Developer, Front End, Back End, Full Stack, Full-Stack, Full Stack Developer, Full-Stack Developer,
      Full Stack Web Developer, Full-Stack Web Developer, Full Stack Web Developer, Full-Stack Web Developer, Full Stack Software Engineer,
      Full-Stack Software Engineer, Full Stack Software Engineer, Full-Stack Software Engineer, Full Stack Software Developer,
      Full-Stack Software Developer, DevOps, DevOps Engineer, DevOps Developer,
      Carlos Soriano, Carlos, Soriano, shortpoet
      #`
    const imageAlt = `A screenshot of the landing page for Carlos Soriano's Resume and Blog.`
    const imageType = 'image/png'
    const twitterHandle = '@shortpoet8'

    let url, image
    if (typeof window !== 'undefined' && window.location !== undefined) {
      url = window.location.href
      const host = window.location.host
      const protocol = window.location.protocol
      // does not account fro public suffix list
      // https://github.com/lupomontero/psl
      const subdomain = window.location.hostname.split('.')[0]
      const useDevImage = subdomain === 'dev' || subdomain === 'localhost'
      image = computed(() => useDevImage ? `${protocol}//${host}/public/github_profile_pic.png` : `${protocol}//${host}/public/shortpoet_open_graph.png`)
    } else {
      const baseUrl = import.meta.env.VITE_APP_URL
      const url = `https://${baseUrl}`
      const useDevImage = import.meta.env.MODE === 'development'
      image = computed(() => useDevImage ? `${url}/public/github_profile_pic.png` : `${url}/public/shortpoet_open_graph.png`)
    }

    useHead({
      title: title,
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          // href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
          href: '/favicon.ico',
        },
        {
          rel: 'canonical',
          href: url,
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: '"https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;700&display=swap',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        //   integrity: 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
        //   crossorigin: 'anonymous',
        // }
      ],
      meta: [
        {
          name: 'description', content: description
        },
        {
          name: 'theme-color',
          content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
        },
        {
          name: 'keywords',
          content: keywords
        },
        {
          name: 'author',
          content: author,
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          name: 'googlebot',
          content: 'index, follow',
        },
        {
          name: 'google',
          content: 'nositelinkssearchbox',
        },

        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:image',
          content: image.value,
        },
        {
          property: 'og:image:alt',
          content: imageAlt,
        },
        {
          property: 'og:locale',
          content: 'en_US',
        },
        {
          property: 'og:site_name',
          content: title,
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:image:type',
          content: imageType,
        },
        {
          property: 'og:updated_time',
          content: new Date().toISOString(),
        },
        {
          property: 'og:see_also',
          content: 'https://www.linkedin.com/in/carlos-soriano/',
        },

        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:site',
          content: twitterHandle,
        },
        {
          name: 'twitter:creator',
          content: twitterHandle,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: image.value,
        },
        {
          name: 'twitter:image:alt',
          content: imageAlt,
        },
        {
          name: 'twitter:image:width',
          content: '1200',
        },
        {
          name: 'twitter:image:height',
          content: '630',
        },
        {
          name: 'twitter:image:type',
          content: imageType,
        },
      ],
    })
  },
}
</script>
