<template>
    <div class="wrap">
        <div v-if="authenticated">
            <v-tabs v-model="tab" centered>
                <v-tab v-for="(tab, i) in tabs" :key="i">
                    {{tab}}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item  :key="1">
                    <admin/>
                </v-tab-item>
                <v-tab-item  :key="2">
                    <create-project/>
                </v-tab-item>
            </v-tabs-items>
        </div>
        <div v-else id="login-container"/>
    </div>
</template>
<script lang="ts">
import {Component, Vue, namespace, Watch, Once} from 'nuxt-property-decorator'
import Admin from '@/components/Admin.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import CreateProject from '@/components/create.vue'
import {adminEmail, getOrCreateFireApp, getOrCreateUI} from '@/utils/firebase-app'

const projects = namespace("projects")


const uiConfig = {
    signInSuccessUrl: 'http://localhost:3000/admin',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
}

const getUiConfig = () =>{
    const redirectUrl = window.location.origin + "/admin"
    uiConfig.signInSuccessUrl = redirectUrl
    return uiConfig
}

@Component({
    components:{
        Admin,
        CreateProject
    },
    head: {
        link: [{rel: "stylesheet", href: "https://www.gstatic.com/firebasejs/ui/4.7.3/firebase-ui-auth.css", type: "text/css"}]
    }
})
export default class Login extends Vue{
    tab = null
    tabs = ["Overview", "Create"]
    authenticated = false
    app!: firebase.app.App
    ui!: firebaseui.auth.AuthUI


    async initApp(){
        const app = getOrCreateFireApp()
        this.ui =  await getOrCreateUI()
        app.auth().onAuthStateChanged( user =>{
            if(user && user.email == adminEmail) this.authenticated = true
        }) 
    }

    async mounted(){
        await this.initApp()
        if (this.ui?.isPendingRedirect() || !this.authenticated)
            this.ui?.start('#login-container', getUiConfig()) 
    }
}
</script>
<style lang="scss" scoped>
.wrap{
  margin-top: 5rem;
  display: block;
  padding: 5rem 0rem;
  min-height: 80vh;
}
</style>