import Vue from 'vue'
import firebase from 'firebase/app'
// import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID
}

export default function({ store, redirect }) {
  if (!firebase.apps.length) firebase.initializeApp(config)
  Vue.prototype.$auth = firebase.auth

  firebase.auth().onAuthStateChanged(user => {
    store.commit('setUser', user)
  })
}
