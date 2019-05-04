import Vue from 'vue'
import moment from 'moment'
import firebase from 'firebase'
require('firebase/firestore')

Vue.prototype.$moment = moment
// Vue.prototype.$firebase = firebase
const config = {
  apiKey: 'AIzaSyCaXtCpRiaQZzlV-dOyZCFfgPo5O88xx8k',
  authDomain: 'nuxt-18b97.firebaseapp.com',
  projectId: 'nuxt-18b97',
  databaseURL: 'https://nuxt-18b97.firebaseio.com'
}
// console.log(firebase.apps)
if (!firebase.apps.length) {
  firebase.initializeApp(config)
  Vue.prototype.$db = firebase.firestore()
  Vue.prototype.$db.settings({
    timestampsInSnapshots: true
  })
}
