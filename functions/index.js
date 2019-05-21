const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const app = express()

app.use(cors({ origin: true }))

app.get('/', (req, res) => res.send('abcdefg'))

exports.widgets = functions.https.onRequest(app)
exports.test = functions.https.onRequest(require('./test'))
