<template>
<nav
class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
id="sideNav"
@click="collapse($event)"
>
<!-- $event apparently helps make sure jest sees the event -->
<a class="navbar-brand js-scroll-trigger" href="#about">
<span class="d-block d-lg-none">Resume</span>
<span id="pic" class="d-none d-lg-block">
<img class="img-fluid img-profile mx-auto mb-2" :src="pic" alt="profile pic" />
</span>
</a>
<button
class="navbar-toggler"
type="button"
data-toggle="collapse"
data-target="#navbarSupportedContent"
aria-controls="navbarSupportedContent"
aria-expanded="false"
aria-label="Toggle navigation"
>
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav">
<li class="nav-item">
<a class="nav-link js-scroll-trigger" href="#about">About</a>
</li>
<li class="nav-item">
<a class="nav-link js-scroll-trigger" href="#skills">Skills</a>
</li>
<li class="nav-item">
<a class="nav-link js-scroll-trigger" href="#awards">Natural Languages</a>
</li>
<li class="nav-item">
<a class="nav-link js-scroll-trigger" href="#experience">Experience</a>
</li>
<li class="nav-item">
<a class="nav-link js-scroll-trigger" href="#education">Education</a>
</li>
<li class="nav-item">
<a class="nav-link js-scroll-trigger" href="#interests">Interests</a>
</li>
</ul>
</div>
</nav>
</template>

<script>
export default {
name: "StartNav",
data() {
return {
pic: require("@/assets/github_profile_pic.jpg"),
isCollapse: false,
};
},
methods: {
collapse() {
console.log("collapse is called");
// Closes responsive menu when a scroll trigger link is clicked
// moving this here to be able to test
// added local boolean that creates coverage
// also makes it so the
this.$(".navbar-collapse").collapse("hide");
this.isCollapse = true;
},
/* istanbul ignore next */
revertPic() {
// @mouseenter="cyclePics" @mouseleave="revertPic"
// this.pic = require('@/assets/profile_pic.jpg')
// clearInterval()
},
/* istanbul ignore next */
cyclePics() {
// let i = 0
// let pics = [require('@/assets/profile_pic1.jpg'), require('@/assets/profile_pic2.jpg')]
// let counter = 0
// let cycle = () => {
//   if (i == 0) {
//     this.pic = pics[1]
//     i = 1
//   } else {
//     this.pic = pics[0]
//     i = 0
//   }
//   if (++counter > 5) {
//     clearInterval(cycle)
//   }
// }
// setInterval(cycle, 1500)
},
},
};
</script>
