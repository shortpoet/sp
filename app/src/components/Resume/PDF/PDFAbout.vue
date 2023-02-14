<template>
<section class="resume-section" id="about">
<!-- basic info row -->
<div
class="d-flex flex-row justify-content-between align-items-center mt-1 ml-3"
id="basic-info"
>
<!-- photo column -->
<div class="d-flex flex-column align-items-center" id="photo">
<img
class="img-fluid img-profile rounded m-1 mb-2"
:src="pic"
alt="profile pic"
:style="{ height: '8rem', width: '7rem' }"
/>
</div>

<!-- name contact column -->
<div class="d-flex flex-column mt-1 mt-md-2 ml-2" id="name-contact">
<ul class="list-inline">
<li>
<h2 style="font-family: 'Saira Extra Condensed'" class="heading heading-2 mb-0">
{{ name }}
<span
id="pdf-surname"
style="font-family: 'Saira Extra Condensed'"
class="text-primary"
>{{ surname }}</span
>
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
<span
id="pdf-address"
style="font-family: 'Saira Extra Condensed'"
class="not-name"
>
{{ address }}
</span>
</li>
<li>
<span id="pdf-flags" class="not-name">{{ flags.replace(/,/g, "") }}</span>
</li>
<li>
<span
id="pdf-visas"
style="font-family: 'Saira Extra Condensed'"
class="not-name"
>Valid Work Visas: {{ visas }}</span
>
</li>
</ul>
</div>

<!-- socials column -->
<div class="d-flex flex-column ml-auto mr-1 mr-md-3" id="socials">
<PDFSocials :renderPDF="renderPDF" :socials="socials" />
</div>
</div>
</section>
</template>

<script>
// import PDFAction from '@/components/Utils/PDFAction'
import PDFSocials from "@/components/Resume/PDF/PDFSocials";

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
visas: {
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
pic: require("@/assets/github_profile_pic.jpg"),
};
},
computed: {},
mounted() {},
};
</script>
<style>
.social-item {
font-size: 0.55rem;
}
</style>
