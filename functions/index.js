const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

admin.initializeApp(functions.config().firebase)
// const db = admin.firestore()

const app = express()

const verifyToken = async (req, res, next) => {
  console.log(JSON.stringify(req.headers))
  const tk = req.headers.authorization.split(' ')[1]
  const u = await admin.auth().verifyIdToken(tk)
  console.log(u)
  next()
}

app.use(cors({ origin: true }))
app.use(verifyToken)
app.get('/', (req, res) => res.send('abcdefg'))

exports.widgets = functions.https.onRequest(app)
exports.test = functions.https.onRequest(require('./test'))
