<template>
  <section class="resume-section p-3 px-lg-5 d-flex flex-column" id="interests">
    <div class="my-auto">
      <h2 class="heading heading-2 mb-4 mb-md-3">Interests</h2>
      <p class="mb-4">{{ interests }}</p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'StartInterests',
  props: {
    interests: {
      type: String
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#interests {
  align-items: center;
}
</style>
