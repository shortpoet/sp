<template>
  <div class="">
    <i v-if="!isImage" :class="source"></i>
    <img v-else :class="imgClass" :src="source" />
    <span v-if="showName" :class="devicon - name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "PDFDevIcon",
  props: {
    source: {
      type: String,
    },
    name: {
      type: String,
      default: null,
    },
    showName: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    isImage() {
      return this.source.match(/svg|jpg|png|jpeg/g) !== null;
    },
    imgClass() {
      let imgClass = "";
      switch (this.name) {
        case "vue":
          imgClass = "vue-devicon-pdf";
          break;
        case "ts":
          imgClass = "ts-devicon-pdf";
          break;
        case "tableau":
          imgClass = "tableau-devicon-pdf";
          break;
        case "d3":
          imgClass = "d3-devicon-pdf";
          break;
        case "azure":
          imgClass = "azure-devicon-pdf";
          break;
        case "bash":
          imgClass = "bash-devicon-pdf";
          break;
        case "terraform":
          imgClass = "terraform-devicon-pdf";
          break;
        case "powershell":
          imgClass = "powershell-devicon-pdf";
          break;
        case "aws":
          imgClass = "aws-devicon-pdf";
          break;
      }
      return imgClass;
    },
  },
  methods: {},
  mounted() { },
};
</script>
