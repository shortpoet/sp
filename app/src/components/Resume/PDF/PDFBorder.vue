<template>
  <hr 
    :style="styleObject"
  />
  <!-- <hr /> -->
</template>
<script>
export default {
  name: 'PDFBorder',
  props: {
    size: {
      type: Number,
      default: 1
    },
    marginX: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    styleObject () {
      let s = this.size
      let m = this.marginX
      if (this.color) {
        return {
          borderWidth: `${.25*(s)}rem`,
          margin: `${.25*(m)}rem`,
          color: this.color
        }
      } else {
        return {
          borderWidth: `${.25*(s)}rem`,
          margin: `${.25*(m)}rem`,
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  hr {
    border: .25rem solid;
    border-radius: .25rem;
    color: $primary;
    margin: 0rem 2rem 0rem 2rem;
  }

  // // this apparently makes a box
  // hr {
  //   height: 1rem;
  //   width: 1rem;
  //   border: .25rem solid;
  //   border-radius: .25rem;
  //   color: $primary;
  //   margin: 0rem 2rem 0rem 2rem;
  // }
</style>