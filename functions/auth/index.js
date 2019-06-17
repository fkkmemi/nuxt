// const functions = require('firebase-functions');
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

// const aaa = (req, res) => {
//   res.send('aaa da!')
// }
// // build multiple CRUD interfaces:

app.use(cors({ origin: true }))
app.post('/signin', (req, res) => {
  const body = req.body
  if (!body.email || !body.password || !body.token) return res.status(400).end()
  const url = 'https://www.google.com/recaptcha/api/siteverify'
  const opt = {
    secret: '6LdVHKkUAAAAAO93PK8Vzl-sZz-FHFgk2rH9dybX',
    response: body.token,
    remoteip: req.ip
  }
  axios
    .post(url, JSON.stringify(opt))
    .then(r => {
      res.send({ success: true })
    })
    .catch(e => {
      // req.status(401).end()
      res.send(e.message)
    })
})

// Expose Express API as a single Cloud Function:
// exports.aaa = functions.https.onRequest(app);

module.exports = app // functions.https.onRequest(app)
