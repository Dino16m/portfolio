<template>
    <div class="base">
        <div class="grid">
            <section class="elevation-4 wrapper">
                <div class="wrapped elevation-4">
                    <v-img src="/img/me.jpg" height="100%" position="50% 20%"/>
                </div>
            </section>
            <section class="about">
                <div class="title">
                    <div id="type-source">
                        <h2 class="">
                            Hi again,^5 I am Darlington Onyemere
                        </h2>
                        <h2>But...^10</h2>
                        <h2>You can call me Dino</h2>
                    </div>
                    <h2 id="type-destination"></h2>
                </div>
                <div class="content">
                    <div>
                        <h2>Bio</h2>
                        <p>
                            I am Darlington Onyemere, a fullstack developer. 
                            Currently focused on mobile and web development which I've been 
                            doing for the better part of 3 years.
                            However, I have recently been seduced by Blockchain technology, piquing my interest and 
                            dragging me closer by the day.
                            <br><br>
                            Being scientist at heart,  I'm open to innovative and challenging prospects
                            which poise to improve the life of the common man.
                            <br><br>
                            I enjoy party jollof with beef not chicken and slightly burnt. 
                            I also enjoy reading and watching well written movies and TV series.
                            <br><br>
                            I am a team player and believe in 
                            <strong> strong institutions </strong> 
                            over <strong> strong men </strong>
                        </p>
                    </div>
                    <details>
                        <summary>
                            <h2 class="inline">Tech I use</h2>
                        </summary>
                        <p>
                            While I'm not dogmatic about technologies and 
                            languages and believe they are just technologies.
                            I am of the opinion that some tools are better for certain jobs than others.
                            This notion has greatly influenced technologies I use.
                        </p>
                        <div>
                            <h4>Database technologies</h4>
                            <ul>
                                <li>Postgres</li>
                                <li>MySQL</li>
                                <li>Apache Cassandra</li>
                            </ul>

                            <h4 class="mt-2">Web frontend technologies</h4>
                            <ul>
                                <li>JQuery</li>
                                <li>Bootstrap</li>
                                <li>Vuejs</li>
                                <li>Vuetify</li>
                                <li>TypeScript</li>
                                <li>Webpack</li>
                                <li>Sass</li>
                                <li>Nuxtjs</li>
                            </ul>

                            <h4 class="mt-2">Mobile technologies</h4>
                            <ul>
                                <li>Flutter</li>
                            </ul>

                            <h4 class="mt-2">Backend technnologies</h4>
                            <ul>
                                <li>PHP (Laravel/Lumen)</li>
                                <li>Python (Django, Flask)</li>
                                <li>Javascript/Typescript (Express)</li>
                                <li>Go (Gin-gonic) </li>
                                <li>Apache webserver</li>
                                <li>Nginx</li>
                                <li>Supervisor</li>
                            </ul>
                        </div>
                    </details>
                    <details>
                        <summary>
                            <h2 class="inline">What I am working on</h2>
                        </summary>
                        At the moment I'm working on web apps connected to dApps
                    </details>
                    <details>
                        <summary> 
                            <h2 class="inline">
                                What I look forward to working on
                            </h2>
                        </summary>
                        I hope to work on interesting biotech products.
                    </details>
                </div>
            </section>
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Typed from 'typed.js'

@Component
export default class About extends Vue{
    writerOptions = {
        showCursor: true,
        cursorChar: '|',
        backSpeed: 30,
        typeSpeed: 35
    }
    mounted(){
        const typeWritter = new Typed(
            '#type-destination', {
            stringsElement: '#type-source',
            ...this.writerOptions
        })
    }
}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.base{
    margin-top: 5rem;
    padding: 4rem 4rem;
}
.grid{
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 0 1.5rem;
}
.inline{
    display: inline;
}
.wrapper{
    margin-top: 1rem;
    width: 100%;
    height: 70vh;
    animation: wrapperin 2s forwards;
}
.wrapped{
    width: 100%;
    height: 100%;
    display: block;
    animation: wrappedin 2s forwards;
}
@keyframes wrapperin {
    0%{
        transform: rotate(10deg);
    }
    50%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(-10deg)
    }
}
@keyframes wrappedin {
    0%{
        transform: rotate(-10deg);
    }
    50%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(10deg)
    }
}
.about .title{
    display: block;
    text-align: center;
}
.title h2{
    font-size: 30px;
    text-align: center;
    display: inline-block;
}
.title{
    font-family: 'IBM Plex Sans', sans-serif !important;
    font-size: 30px !important;
}
.about > .content{
    display: block;
    padding: 2rem;
}
.content h2{
    font-size: 23px;
}
.content p{
    color: var(--text-light-color);
    font-size: 17px;
    font-family: Roboto, sans-serif;
}
.content li{
    list-style: circle;
    font-size: 17px;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
    .wrapper{
        display: none;
    }
    .grid{
        display: block;
    }
    .base{
        padding: 1.8rem 1rem;
        background-image: url('/img/also-me.png');
        height: 100vh;
        display: block;
        background-position: 50% 50%;
    }
    .about > .content{
        padding: 2rem 0rem;
    }
}
</style>