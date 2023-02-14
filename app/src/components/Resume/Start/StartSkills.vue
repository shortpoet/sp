<template>
<section
class="resume-section pl-3 px-lg-5 mt-5 mb-4 mb-md-3 d-flex flex-column"
id="skills"
>
<div class="my-auto">
<h2 class="heading heading-2 mb-4 mb-md-3">Skills</h2>
<div class="subheading mb-3">Programming Languages &amp; Tools</div>
<ul class="list-devicons list-inline list-icons">
<!-- <FlexList 
          v-slot:default="slotProps"
          :items="icons"
          :display-rows="3"
        >
          <li class="list-inline-item">
            <StartDevIcon :source="slotProps.item.icon"/>
          </li>
        </FlexList> -->
<li class="list-inline-item" v-for="(icon, i) in icons" :key="i">
<StartDevIcon :source="icon.icon" :name="icon.name" />
</li>
</ul>
<div v-for="(type, i) in skills" :key="i" class="skill-grid">
<div class="subheading mb-3">
{{ type.type }}
</div>
<ul class="fa-ul mb-3 skill-list">
<li v-for="(skill, i) in listSkills(type.details)" :key="i">
<span class="skill">
<i class="skill-icon fa fa-check"></i>
{{ skill }}
</span>
</li>
</ul>
</div>
</div>
</section>
</template>

<script>
// import FlexList from '@/components/Utils/FlexList'
import StartDevIcon from "@/components/Resume/Start/StartDevIcon";
import icons from "@/assets/icons.js";

export default {
name: "StartSkills",
props: {
skills: {
type: Array,
},
},
components: {
StartDevIcon,
// FlexList
},
data() {
return {
icons: icons.icons,
};
},
methods: {
listSkills(skills) {
return skills.split(",");
},
},
mounted() {
// console.log(icons)
},
};
</script>

<style lang="scss" scoped>
.vue-devicon {
/* height: 48px;
  width: 48px;
  line-height: 1;
  padding: 4px;
  margin-bottom: 12px; */
height: 3rem;
width: 3rem;
line-height: 1;
padding: 0.25rem;
margin-bottom: 0.8rem;
color: red;
}
.vue-devicon:hover {
color: red;
}
.skill-grid {
/* display: flex; */
/* flex-wrap: wrap; */
}
.skill-list li {
/* adding inline-block instead of inline allowed the icon and text to stay on same line */
display: inline-block;
margin: 0rem 0.5rem 0rem 0rem;
}

/*
  in case one would want to implement the below
  https://stackoverflow.com/questions/50310201/make-elements-wrap-in-groups-not-one-by-one
 */

.skill {
/* flex: 0 0 33%; */
/* display: inline-block; */
}

/* @media ( max-width: 800px) {
  .skill-grid {
    width: 50%;
  }
}

@media ( max-width: 600px) {
  .skill-grid {
    width: 33%;
  }
}

@media ( max-width: 400px) {
  .skill-grid {
    width: 15%;
  }
}

* {
  box-sizing: border-box;
} */
</style>
