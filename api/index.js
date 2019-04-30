const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  res.send('here is root' + Math.random())
})
app.use('/hello', require('./hello'))

module.exports = {
  path: '/api',
  handler: app
}
