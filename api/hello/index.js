const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('hello ' + Math.random())
})

module.exports = router
