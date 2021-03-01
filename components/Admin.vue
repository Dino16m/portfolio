<template>
    <div class="overview">
        <div v-if="loading || isEmpty">
            <v-skeleton-loader 
                tile boilerplate width="100%" type="card"
                v-for="i in 4" :key="i"
            />
        </div>
        <div class="projects" v-else>
            <project 
                :isAdmin="true" :project="project"
                v-for="(project, i) in projects" :key="i"
            />
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue, namespace} from 'nuxt-property-decorator'
import Project from '@/components/project.vue'

import IProject from "@/types/project"

const projects = namespace("projects")
@Component({
    components:{
        Project
    }
})
export default class Admin extends Vue{
    @projects.State
    projects!:  IProject[]

    loading = false

    get isEmpty(){
        if (this.loading) return false
        return this.projects.length < 1
    }

    @projects.Action
    getProjects!: () => Promise<void>

    async created(){
        if (this.projects.length > 1) return
        this.loading = true
        await this.getProjects()
        this.loading = false 
    }

}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.overview{
    padding: 0 14rem;
    position: relative;
}
.projects {
  display: grid;
  gap: 1rem 1.5rem;
  grid-template-columns: 50% 50%;
  padding: 1rem 0;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
    .projects {
        display: grid;
        gap: 1rem 0;
        grid-template-columns: 100%;
        padding: 1rem 0;
    }
    .overview{
        padding: 0rem 1rem;
    }
}
</style>