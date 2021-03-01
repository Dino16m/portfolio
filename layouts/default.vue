<template>
  <v-app>
    <v-header/>
    <div clas="container">
      <Nuxt/>
    </div>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      fixed
      open-on-hover
      transition='slide-y-reverse-transition'
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-message-text-outline
          </v-icon>
        </v-btn>
      </template>
      <v-btn 
        fab  
        elevation="5" 
        bottom
        dark
        right
        href="mailto:dinoonyemere@outlook.com"
        color="#DB4437"
      >
        <v-icon>mdi-gmail</v-icon>
      </v-btn>
      <v-btn 
        fab  
        elevation="5" 
        bottom
        dark
        right
        href="http://m.me/darlington.onyemere"
        color="#0078FF"
      >
        <v-icon>mdi-facebook-messenger</v-icon>
      </v-btn>
      
    </v-speed-dial>
  </v-app>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import VHeader from '~/components/header.vue'

@Component({
  components: {
    VHeader
  }
})
export default class App extends Vue{
  fab = false

  mounted() {
    const script = document.createElement("script")
    script.type = "application/ld+json"
    const content = {
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": "Darlington Onyemere",
      "author": "Darlington Onyemere",
      "image": window.location.origin + "img/me.jpg",
      "email": "dinoonyemere@outlook.com",
      "knowsAbout": "Web app development"
    }
    document.body.appendChild(script);
  }
}
</script>
<style lang="scss">
  
</style>
