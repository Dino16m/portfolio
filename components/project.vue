<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <div class="project">
        <div class="bar">
          <h2>{{project.name}}</h2>
          <i />
        </div>
        <v-img height="250" class="slide" :src="project.secondaryImage" v-if="hover"/>
        <v-img height="250" :src="project.primaryImage" v-else/>
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
                <div class="d-flex flex-wrap tags justify-center">
                    <v-chip
                      class="ma-1 tag" pill label
                      v-for="(tag, index) in tags"
                      :key="index"
                    >
                      {{tag}}
                    </v-chip>
                </div>
                <div class="d-flex justify-center mt-4">
                  <v-chip 
                      v-if="isAdmin"  
                      class="roll-in-top" pill label
                      :to="`/admin/edit/${project.id}`"
                    >
                      Edit
                    </v-chip>
                    <v-chip 
                      v-else
                      class="roll-in-top" pill label
                      :to="`/portfolio/${project.id}`"
                    >
                      See details
                    </v-chip>
                    
                </div>
          </v-overlay>
        </v-fade-transition>
      </div>
    </template>
  </v-hover>
</template>
<script lang="ts">
import { Component, Prop, Vue, namespace } from 'nuxt-property-decorator'
import IProject from "@/types/project"


@Component
export default class Project extends Vue {
  @Prop({required: true})
  project!: IProject

  @Prop({required: false, default: false})
  isAdmin!: boolean

  get tags(){
    const tags = this.project?.tags || []
    const tagSet = new Set(tags)
    return [...tagSet]
  }

}
</script>
<style lang="scss" scoped>
.project {
  position: relative;
}

.project .bar h2 {
  content: attr(data-text);
  text-align: center;
  font-size: 10px;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.5px;
  color: #8a8a8a;
}
.slide{
    transition-property: all;
	transition-duration: .5s;
    transform: translate3d(0,0,0);
    transform-style: flat;
}
.tags{
    padding: 2rem;
}
.tag {
    -webkit-animation: roll-in-right 0.6s ease-out both;
	        animation: roll-in-right 0.6s ease-out both;
    animation-direction: alternate;
}
.tag:nth-child(n+4){
  -webkit-animation: roll-in-left 0.6s ease-out both;
	        animation: roll-in-left 0.6s ease-out both;
    animation-direction: alternate;
}
.roll-in-top {
	-webkit-animation: roll-in-top 0.6s ease-out both;
	        animation: roll-in-top 0.6s ease-out both;
}
@-webkit-keyframes roll-in-top {
  0% {
    -webkit-transform: translateY(-300px) rotate(-540deg);
            transform: translateY(-300px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotate(0deg);
            transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
}
@keyframes roll-in-top {
  0% {
    -webkit-transform: translateY(-300px) rotate(-540deg);
            transform: translateY(-300px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotate(0deg);
            transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
}
@-webkit-keyframes roll-in-left {
  0% {
    -webkit-transform: translateX(-300px) rotate(-540deg);
            transform: translateX(-300px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}
@keyframes roll-in-left {
  0% {
    -webkit-transform: translateX(-300px) rotate(-540deg);
            transform: translateX(-300px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}
@-webkit-keyframes roll-in-right {
  0% {
    -webkit-transform: translateX(300px) rotate(540deg);
            transform: translateX(300px) rotate(540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}
@keyframes roll-in-right {
  0% {
    -webkit-transform: translateX(300px) rotate(540deg);
            transform: translateX(300px) rotate(540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}


</style>