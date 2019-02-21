const path = require('path')
const router = require('express').Router()

module.exports = app => {
  router.get('/', (req, res) => {
    app.render(req, res, '/')
  })

  router.get('/favicon.ico', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'favicon.ico'))
  })

  return router
}
