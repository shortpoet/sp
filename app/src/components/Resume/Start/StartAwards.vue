<template>
  <section class="resume-section p-3 px-lg-5 d-flex flex-column" id="awards">
    <div class="my-auto">
      <h2 class="heading heading-2 mb-4 mb-md-3">Natural Languages</h2>
      <ul class="fa-ul mb-0">
        <li
          v-for="(lang, i) in spokenLanguages"
          :key="i"
        >
          <i :class="lang.type + ' language-icon fa fa-flag fa-li'"></i>
          <span class="mb-5">{{ `${lang.languages} (${recase(lang.type)})` }} </span>
        </li>
        <li>
          <i class="award-icon fa fa-trophy fa-li"></i>
          Certified Interpreter
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import _recase from '@/utils/recase.js'
export default {
  name: 'StartAwards',
  props: {
    spokenLanguages: {
      type: Array
    }
  },
  methods: {
    recase(input) {
      return _recase(input)
    }
  }
}
</script>

<style scoped>

</style>