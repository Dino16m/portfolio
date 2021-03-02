<template>
  <div>
    <section class="intro">
      <div class="intro-text text-center">
        <h1>
          Hi, I am Dino
        </h1>
        <div class="d-none d-sm-block">
          <div id="type-source">
            <span>
              I build amazing software^10, at great prices too.^1 <br>
              Learn about me and the tech I use on my 
              <nuxt-link class="ilink" to="/about"> 
                about page. 
              </nuxt-link> <br>
              Check out my latest projects on the 
              <nuxt-link class="ilink" to="/portfolio"> 
                portfolio page. 
              </nuxt-link> <br>
              Get in touch,^1 click on the message button
            </span>
          </div>
          <span id="type-destination"/>
        </div>
        <div class="d-block d-sm-none">
          <h2>
            I build software solutions for humans
          </h2>
          <nuxt-link to="/about" class="text-decoration-none about-link"> 
            <v-icon>mdi-arrow-right</v-icon> Learn more about me
          </nuxt-link>
          <v-btn class="custom-btn" color="#f7931a" dark nuxt to="/portfolio">
            View Portfolio
          </v-btn>
        </div>
      </div>
    </section>
    <div class="social-bar d-none d-sm-flex flex-column ">
      <a class="d-block fb" href="https://web.facebook.com/darlington.onyemere">
        <span>Check me out on Facebook</span>
      </a>
      <a class="d-block gh" href="https://github.com/dino16m">
        <span>I'm on github</span>
      </a>
      <a class="d-block in" href="https://www.linkedin.com/in/darlington-o-29b268a9/">
        <span>Check out my LinkedIn</span>
      </a>
      <a class="d-block ig" href="https://www.instagram.com/hiz_dynasty/">
        <span>Follow me on Instagram</span>
      </a>
      <a class="d-block tw" href="https://twitter.com/dino16m?ref_src=twsrc%5Etfw">
        <span>Follow me on Twitter</span>
      </a>
    </div>
    <div class="social-footer d-block d-sm-none">
      <div class="d-block mx-auto text-center custom-blue">
        Find me on the internet
      </div>
      <div class="d-flex flex-row justify-center links">
        <a href="https://web.facebook.com/darlington.onyemere">
          <v-icon class="mx-1" color="black">mdi-facebook</v-icon>
        </a>
        <a href="https://twitter.com/dino16m?ref_src=twsrc%5Etfw"> 
          <v-icon class="mx-1" color="black">mdi-twitter</v-icon> 
        </a>
        <a href="https://github.com/dino16m"> 
         <v-icon class="mx-1" color="black">mdi-github</v-icon> 
        </a>
        <a href="https://www.linkedin.com/in/darlington-o-29b268a9/">
          <v-icon class="mx-1" color="black">mdi-linkedin</v-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Typed from 'typed.js'

@Component
export default class Home extends Vue {
  writerOptions = {
    showCursor: true,
    cursorChar: '__',
    backSpeed: 30,
    typeSpeed: 35
  }

  mounted(){
    const typeWritter = new Typed('#type-destination', {
      stringsElement: '#type-source',
      ...this.writerOptions
    })
  }

}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.intro{
  margin-top: 5rem;
  display: block;
  padding: 5rem 6rem;
  min-height: 80vh;
  background-image: url('../assets/img/intro.png');
  background-position: 93% 95%;
  background-size: 40%;
}
.intro-text > h1{
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 143%;
  color: #000000;
}
.intro-text span{
  font-style: normal;
  font-size: 20px;
  color: #000000;
}
.intro-text span{
  font-family: Roboto, sans-serif;
  line-height: 170%;
  font-weight: 400;
}
.social-bar{
  position: absolute;
  left: 0;
  top: 30%;
  height: 40%;
  bottom: 30%;
  width: 3rem;
}
.social-bar > a{
  height: calc(100% / 5);
  padding-top: calc( calc(100% - 38px) / 2 );
  transition: transform 425ms cubic-bezier(.05,.65,.18,1);
}
.social-bar > a span {
  display: block;
  width: 40px;
  height: 40px;
  margin: auto;
  background: url('../assets/svg/social-icons.svg') no-repeat 0 1px;
  background-size: 100% auto;
  text-indent: -9999em;
}
.social-bar > a:hover{
  width: calc(100% + 1.5rem);
  padding-left: 1.5rem;
}
.social-bar .fb{
  background-color: #4868AD;
}
.social-bar .fb span{
  background-position: -1% -117px;
}
.social-bar .gh{
  background-color: #4E545A;
}
.social-bar .gh span{
  background-position: 0 -40px;
}
.social-bar .in{
  background-color: #0077BA;
}
.social-bar .in span{
  background-position: 0 -160px
}
.social-bar .tw{
  background-color: #3299FF;
}
.social-bar .tw  span{
  background-position: 0 -80px;
}
.social-bar .ig{
  background: radial-gradient(
    circle at 25% 110%,#fdf497 0,#fdf497 5%,#fd5949 45%,
    #d6249f 60%,#285aeb 90%),
    radial-gradient(circle at 25% 110%,#b9a800 0,#938500 5%,
    #b10f00 45%,#8c0061 60%,#002ca9 90%
  );
}
@media #{map-get($display-breakpoints, 'xs-only')}{
  .intro{
    padding: 3rem 0.3rem;
    margin-top: 4rem ;
    background-position: 50% 97%;
    background-size: 100%;
    object-fit: cover;
    object-position: center;
    background-image: url('../assets/img/intro-half.png');
  }
  .intro-text > h1{
    font-size: 30px;
    line-height: 100%;
    margin-bottom: 1rem;
  }
  .intro-text h2{
    font-size: 19px;
  }
  .intro-text span{
    font-size: 18px;
    line-height: 100%;
    color: #666666;
  }
  .about-link{
    font-size: 19px;
    display: block;
    margin: 1rem 0;
    color: #7c9cbf;
  }
  .social-footer{
    position: fixed;
    border-top: 2px solid  #4E545A;
    bottom: 3rem;
    top: calc(100% - 5rem);
    width: 100%;
  }
  .social-footer .links{
    margin: 0.5rem 0 1rem;
  }
  .links > a{
    text-decoration: none;
  }
  .custom-blue{
    color: #7c9cbf;
  }
}
</style>
