<template>
  <div>
    <v-skeleton-loader
      boilerplate
      height="70vh"
      tile
      type="card"
      class="mx-5"
      v-if="loading"
    />
    <div class="portfolio" v-else>
      <section class="title">
        <h1>{{ project.name }}</h1>
        <p>{{ project.desc }}</p>
      </section>
      <section class="carousel">
        <div class="bar">
          <i />
        </div>
        <v-carousel
          :continuous="false"
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          :height="$vuetify.breakpoint.smAndUp ? 400 : '100%'"
        >
          <v-carousel-item v-for="image in carouselItems" :key="image">
            <v-img :src="image" height="100%" lazy-src="~/assets/logo.png" />
          </v-carousel-item>
        </v-carousel>
      </section>
      <section class="tech-sheet">
        <h2 class="tech">Technical Sheet</h2>
        <em> Technologies and languages utilized in this project </em>
        <v-divider class="my-2" />
        <ul>
          <li v-for="(tech, index) in project.techSheet" :key="index">
            {{ tech }}
          </li>
        </ul>
      </section>
      <section class="tech-sheet">
        <h2 class="available">Availability</h2>
        <v-divider class="my-2" />
        <ul>
          <li v-if="project.availability">
            This project is available online at
            <a :href="project.availability" class="ilink">
              {{ project.availability }}
            </a>
          </li>
          <li v-else>This project offline at the moment</li>
        </ul>
      </section>
      <section class="tech-sheet">
        <h2 class="credits">Credits</h2>
        <v-divider class="my-2" />
        <ul>
          <li v-for="(credit, index) in project.credits" :key="index">
            {{ credit }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import IProject from '@/types/project'

const projects = namespace('projects')

@Component
export default class ProjectDetail extends Vue {
  loading = false

  @projects.State
  projects!: IProject[]

  @projects.Action
  getProjects!: () => Promise<void>

  get project() {
    const id = this.$route.params['details']
    return this.projects.find((project) => project.id == id) || ({} as IProject)
  }

  get carouselItems() {
    if (Object.values(this.project).length < 1) return []
    return [this.project.primaryImage, this.project.secondaryImage]
  }

  async mounted() {
    if (this.projects.length > 0) return
    this.loading = true
    this.getProjects()
    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.portfolio .title {
  display: block;
  padding-top: 1rem;
}
.portfolio .title > h1 {
  font-size: 40px;
}
.portfolio .title > p {
  font-weight: normal;
  display: block;
  margin-top: 1rem;
}
.tech-sheet {
  margin-top: 2rem;
}
.tech-sheet h2 {
  font-size: 30px;
}
.tech-sheet em {
  font-size: 20px;
}
.tech-sheet hr {
  border-width: 1px;
  margin-right: 50%;
}
.tech-sheet li {
  list-style-type: circle;
  font-size: 23px;
}
.tech-sheet h2::before {
  -webkit-font-feature-settings: 'liga';
  font-feature-settings: 'liga';
  font-family: 'Material Design Icons';
  font-weight: 500;
}
.tech::before {
  content: '\F14D9';
  color: #86a3c3;
}
.available::before {
  color: green;
  content: '\F0BE0';
  margin-right: 1px;
}
.credits::before {
  color: #cc0000;
  content: '\F02D1';
  margin-right: 2px;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
  .portfolio {
    text-align: left;
  }
}
</style>
