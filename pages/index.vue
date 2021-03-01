<template>
  <div>
    <section class="intro">
      <div class="intro-text text-center">
        <h1>
          Hi, I am Darlington Onyemere
        </h1>
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
    </section>
    <div class="social-bar d-flex flex-row flex-sm-column">
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
    padding: 5rem 0.3rem;
    margin-top: 4rem ;
    background-position: 50% 100%;
    background-size: 100%;
    object-fit: cover;
    object-position: center;
    background-image: url('../assets/img/intro-half.png');
  }
  .intro-text > h1{
    font-size: 23px;
    line-height: 120%;
    margin-bottom: 2rem;
  }
  .intro-text span{
    font-size: 18px;
    line-height: 100%;
    color: #666666;
  }
  .social-bar{
    position: absolute;
    left: 0;
    height: 3rem;
    top: calc(100% - 4rem);
    bottom: 0.5%;
    width: 45px;
  }
  .social-bar > a{
    height: 100%;
    padding-top: calc( calc(100% - 38px) / 2 );
  }
}
</style>
