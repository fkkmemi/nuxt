import Vue from 'vue'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.prototype.$moment = moment
if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID
  }
  firebase.initializeApp(config)
  Vue.prototype.$db = firebase.firestore()
  Vue.prototype.$db.settings({
    timestampsInSnapshots: true
  })
  Vue.prototype.$auth = firebase.auth
  // Vue.prototype.$firebase = firebase

  // Initialize document
  // const cityRef = Vue.prototype.$db.collection('cities').doc('SF')
  // cityRef.set({
  //   name: 'San Francisco3',
  //   state: 'CA',
  //   country: 'USA',
  //   capital: false,
  //   population: 860000
  // })
  //
  // Vue.prototype.$db
  //   .runTransaction(t => {
  //     return t.get(cityRef).then(doc => {
  //       // Add one person to the city population
  //       const newPopulation = doc.data().population + 1
  //       t.update(cityRef, { population: newPopulation })
  //     })
  //   })
  //   .then(result => {
  //     console.log('Transaction success!')
  //   })
  //   .catch(err => {
  //     console.log('Transaction failure:', err)
  //   })

  // const writeAndUpdate = async () => {
  //   const cityRef = Vue.prototype.$db.collection('cities').doc('SS')
  //   const r = await Vue.prototype.$db.runTransaction(async t => {
  //     const w = await t.set(cityRef, { name: 'aa', type: 0 })
  //     console.log(w)
  //     const u = await t.update(cityRef, { name: 'aa', type: 2 })
  //     console.log(u)
  //     const g = await t.get(cityRef)
  //     console.log(g)
  //   })
  //   return r
  // }
  // writeAndUpdate()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e.message))
}
