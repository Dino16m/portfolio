<template>
  <div class="portfolio">
    <section class="intro">
      <h1 class="">Web Developer Portfolio</h1>
      <p>
        From Web Apps and DApps to Vue.JS, Django, Flutter, JQuery,
        Laravel, Spring, Node.JS, and more. Check out my latest
        projects.
      </p>
    </section>
    <section class="filter-buttons d-flex flex-row flex-wrap">
      <v-btn 
        class="custom-btn ma-1" ripple outlined 
        @click="selected = defaultTag"
      > 
        All 
      </v-btn>
      <v-btn 
        class="custom-btn ma-1" outlined ripple 
        v-for="(tag, index) in tags"
        :key="index"
        @click="selected = tag"
      >
        {{tag}}
      </v-btn>
    </section>
    <section class="projects" v-if="loading">
      <v-skeleton-loader 
        tile boilerplate width="100%" type="card"
        v-for="i in 4" :key="i"
      />
    </section>
    <section class="projects" v-else>
      <Project 
        v-for="(project, i) in displayProjects"
        :key="i"
        :project="project"
      />
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import IProject from "@/types/project"

const projects = namespace("projects")

@Component
export default class Portfolio extends Vue {
  loading = false

  @projects.State
  projects!: IProject[]
  
  @projects.Getter
  tags!: string[]
  
  @projects.Action
  getProjects!: () => Promise<void>

  defaultTag = "all"
  selected = this.defaultTag
  
  get displayProjects(){
    if (this.selected == "" || this.selected == this.defaultTag)
      return this.projects
    return this.projects.filter(project => project.tags.includes(this.selected))
  }

  async mounted(){
    if (this.projects.length > 0) return
    
    this.loading = true
    await this.getProjects()
    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.intro > h1 {
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 143%;
}
.intro p {
  font-weight: 400;
  font-size: 18px;
}
.filter-buttons .custom-btn {
  border: 1px solid #dbe2ea;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(44, 39, 56, 0.0001),
    0px 2px 4px rgba(44, 39, 56, 0.08);
  border-radius: 5px;
  color: #476485;
}
.projects {
  display: grid;
  gap: 1rem 1.5rem;
  grid-template-columns: 50% 50%;
  margin-top: 2rem;
  padding: 1rem 0;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
    .intro > h1 {
        text-align: left;
        margin-top: 1rem;
        font-weight: 600;
        font-size: 35px;
        line-height: 100%;
    }
    .projects {
        display: grid;
        gap: 1rem 0;
        grid-template-columns: 100%;
        margin-top: 2rem;
        padding: 1rem 0;
    }
}
</style>
