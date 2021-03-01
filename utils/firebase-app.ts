import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB77hy5meDRTJXhpdXniaqTY71tQ6orLy0",
    authDomain: "portfolio-3b808.firebaseapp.com",
    projectId: "portfolio-3b808",
    storageBucket: "portfolio-3b808.appspot.com",
    messagingSenderId: "586996456707",
    appId: "1:586996456707:web:8a54d5ece81dad9b745d36",
    measurementId: "G-757R9408YF"
}

let app:firebase.app.App
export const adminEmail = "anselem16m@gmail.com"
export const getOrCreateFireApp = () => {
    if(!app){
        app = firebase.initializeApp(firebaseConfig, "portfolio")
    }
    return app
}

let authUI: any

export const  getOrCreateUI = async () =>{
    const firebaseui = await import('firebaseui')
    if(!authUI){
    const app  = getOrCreateFireApp()
    authUI = new firebaseui.auth.AuthUI(app.auth())
 }
 return authUI as firebaseui.auth.AuthUI
}