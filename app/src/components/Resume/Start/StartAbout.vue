<template>
  <!-- 
    moving #about to higher up in dom so collapsed menu doesn't overlap on navigate 
    alas this didn't work
    TODO
  -->
  <section class="resume-section p-3 px-lg-5 d-flex d-column" id="about">
    <div class="my-auto">
      <h1 class="heading heading-1 mb-0">{{ name }}
        <span class="text-primary">{{ surname }}</span>
      </h1>
      <!-- https://lonewolfonline.net/html-character-codes-ascii-entity-unicode-symbols/ -->
      <div class="ml-2 d-inline-flex flex-column subheading">
        <div class="d-inline-flex flex-column">
          <span id="start-flags" class="not-name">{{ flags.replace(/,/g, '') }}</span>
          <a :href="'mailto:' + email">{{ email }}</a>
          <!-- <span class="mx-2" style="color:#343a40">&#8226;</span>  -->
          <span id="start-address">{{ address }}</span>
          <!-- <span class="ml-1">&#937;</span>  -->
        </div>
        <div class="d-flex flex-column">
          <!-- <span class="mx-2" style="color:#343a40">&#8226;</span>  -->
          <span id="start-visas" class="not-name">Valid Work Visas: {{ visas }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'StartAbout',
    components: {
    },
    props: {
      name: {
        type: String
      },
      surname: {
        type: String
      },
      email: {
        type: String
      },
      address: {
        type: String
      },
      visas: {
        type: String
      },
      flags: {
        type: String
      }
    },
    data () {
      return {
      }
    },
    computed: {
    }
}
</script>
