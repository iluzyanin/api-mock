const path = require('path')
const router = require('express').Router()

module.exports = app => {
  router.get('/', (req, res) => {
    app.render(req, res, '/')
  })

  router.get('/favicon.ico', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'favicon.ico'))
  })

  router.get('/:pageName', (req, res) => {
    const actualPage = `/${req.params.pageName}`
    app.render(req, res, actualPage, req.query)
  })

  return router
}
