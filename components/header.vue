<template>
  <div>
    <v-app-bar 
      color="#FFFFFF" flat app class="home-nav"
      :prominent="$vuetify.breakpoint.smAndUp" 
      style="z-index: 20" elevate-on-scroll
    >
      <div class="nav-wrap d-flex flex-row">
        <img
          @click="$router.push({path: '/'})"
          src="@/assets/svg/logo.svg"
          :height="$vuetify.breakpoint.smAndUp ? '' : 40"
          class="pt-2 pt-sm-0 clickable"
        />
        <v-spacer />
        <div class="d-block d-sm-none">
          <div 
            class="burger" 
            :class="{ open: open }" @click="open = !open"
          >
            <i/>
            <i/>
            <i/>
          </div>
        </div>
        <div class="d-none d-sm-flex flex-row">
          <v-btn to="/" nuxt outlined class="nav-btn custom-btn">
            <span class="nav-blue-text"> Home </span>
          </v-btn>
          <v-btn outlined nuxt to="/portfolio" class="nav-btn custom-btn mx-3">
            <span class="nav-blue-text"> Portfolio </span>
          </v-btn>
          <v-btn class="custom-btn" nuxt to="/about" color="#F7931A">
            <span class="white--text"> About me </span>
          </v-btn>
        </div>
      </div>
      <template v-slot:extension v-if="$vuetify.breakpoint.xsOnly">
        <transition name="extension">
          <div
            class="white extension d-flex flex-column px-auto text-center elevation-5 rounded"
            v-if="open"
          >
            <nuxt-link to="/" class="mt-2 mb-1"> Home </nuxt-link>
            <nuxt-link to="/portfolio" class="mt-2 mb-1"> Portfolio </nuxt-link>
            <nuxt-link to="/about"  class="my-1"> About me </nuxt-link>
          </div>
        </transition>
      </template>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VHeader extends Vue {
  open = false;
}
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
.nav-blue-text {
  color: #7c9cbf;
}
.home-nav,
.first-sec {
  background: #ffffff;
}
.nav-wrap {
  min-width: 100%;
  max-width: 100%;
}
.home-nav {
  padding: 2rem 4rem 0;
}
.nav-btn {
  background: #ffffff;
  border: 1px solid #dbe2ea;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(44, 39, 56, 0.0001),
    0px 2px 4px rgba(44, 39, 56, 0.08);
  border-radius: 3px;
}
.contact-btn {
  background: #f7931a;
  box-shadow: 0px 1px 2px rgba(44, 39, 56, 0.08),
    0px 2px 4px rgba(44, 39, 56, 0.08);
  border-radius: 3px;
}
.burger i {
  display: block;
  width: 38px;
  height: 2px;
  margin: 8px;
  background-color: #7a7a7a;
  transition: 0.5s ease-in-out;
}
.burger {
  z-index: 9998;
  cursor: pointer;
  padding: 5px 4px;
  background-color: transparent;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
}
.burger.open i:nth-child(1) {
  transform: rotate(135deg) translateY(-14px);
  transition: 0.25s ease-in-out;
}
.burger.open i:nth-child(2) {
  transform: translateX(8px);
  background-color: transparent !important;
  transition: 0.25s ease-in-out;
}
.burger.open i:nth-child(3) {
  transform: rotate(-135deg) translateY(14px);
  transition: 0.25s ease-in-out;
}
.extension{
  width: 100%; 
  margin-top: 3rem;
}
.extension a{
  text-decoration: none;
  color: #f7931a;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
  .home-nav {
    padding: 0.1rem 0;
  }
  
}
</style>