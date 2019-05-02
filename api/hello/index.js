import moment from 'moment'
const router = require('express').Router()

router.get('/', (req, res, next) => {
  const ss = []
  ss.push('hello backend')
  ss.push(Math.random())
  ss.push(
    moment()
      .toDate()
      .toLocaleTimeString()
  )
  res.send(ss.join('-'))
})

module.exports = router
