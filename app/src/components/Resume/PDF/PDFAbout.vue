<template>
  <section :class="sectionClass" id="about">
    <!-- basic info row -->
    <div class="d-flex flex-row justify-content-between align-items-center" id="basic-info">

      <!-- photo / info row -->
      <div class="d-flex flex-row align-items-center">
        <!-- photo column -->
        <div class="d-flex flex-column align-items-center" id="photo">
          <img class="img-fluid img-profile rounded m-1 mb-2" :src="pic" alt="profile pic"
            :style="{ height: '8rem', width: '7rem' }" />
        </div>

        <!-- name contact column -->
        <div class="d-flex flex-column mt-1 mt-md-2 ms-2" id="name-contact">
          <ul class="list-inline">
            <li>
              <h2 style="font-family: 'Saira Extra Condensed'" class="heading-pdf heading-2 mb-0">
                {{ name }}
                <span id="pdf-surname" style="font-family: 'Saira Extra Condensed'" class="text-primary">{{
                  surname
                }}</span>
              </h2>
            </li>
            <li>
              <span class="not-name">
                <a style="font-family: 'Open Sans'" :href="'mailto:' + email">
                  {{ email }}
                </a>
              </span>
            </li>
            <li>
              <span id="pdf-address" style="font-family: 'Saira Extra Condensed'" class="not-name">
                {{ address }}
              </span>
            </li>
            <li>
              <span id="pdf-flags" class="not-name">{{ flags.replace(/,/g, "") }}</span>
            </li>
            <li>
              <span id="pdf-citizenship" style="font-family: 'Saira Extra Condensed'" class="not-name">Citizenship: {{
                citizenship
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- socials row -->
      <div class="d-flex flex-row align-items-center">
        <!-- socials column -->
        <div class="d-flex flex-column ms-auto me-1 me-md-3" id="socials">
          <PDFSocials :renderPDF="renderPDF" :socials="socials" />
        </div>

      </div>

    </div>
  </section>
</template>

<script>
// import PDFAction from '@/components/Utils/PDFAction'
import PDFSocials from "@/components/Resume/PDF/PDFSocials.vue";
import pic from "@/assets/github_profile_pic.jpg";
export default {
  name: "PDFAbout",
  components: {
    // PDFAction,
    PDFSocials,
  },
  props: {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    citizenship: {
      type: String,
    },
    flags: {
      type: String,
    },
    renderPDF: {
      type: Boolean,
      default: false,
    },
    socials: {
      type: Array,
    },
  },
  data() {
    return {
      pic: pic,
    };
  },
  computed: {
    sectionClass() {
      return this.renderPDF
        ? "resume-section-render mt-1"
        : "resume-section mt-1 ms-3";
    },
  },

  mounted() {
  },
};
</script>
<style></style>
