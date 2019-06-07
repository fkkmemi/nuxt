// const functions = require('firebase-functions');
const express = require('express')

const app = express()

// const aaa = (req, res) => {
//   res.send('aaa da!')
// }
// // build multiple CRUD interfaces:
app.get('/', (req, res) => res.send('app get'))
app.get('/abc', (req, res) => res.send('app get@@@'))

// Expose Express API as a single Cloud Function:
// exports.aaa = functions.https.onRequest(app);

module.exports = app // functions.https.onRequest(app)
