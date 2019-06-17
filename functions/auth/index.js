// const functions = require('firebase-functions');
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const functions = require('firebase-functions')

const app = express()

app.use(cors({ origin: true }))
app.post('/recaptcha', (req, res) => {
  const token = req.body.token
  if (!token) return res.status(400).end()
  const url = 'https://www.google.com/recaptcha/api/siteverify'
  const opt = {
    secret: functions.config().recaptcha.key,
    response: token,
    remoteip: req.ip
  }
  axios
    .post(url, JSON.stringify(opt))
    .then(r => {
      res.send({ success: true })
    })
    .catch(e => {
      req.status(401).end()
    })
})

module.exports = app
