const router = require('express').Router();

module.exports = (app) => {
  router.get('/', (req, res) => {
    app.render(req, res, '/');
  });

  router.get('/:pageName', (req, res) => {
    const actualPage = `/${req.params.pageName}`;
    app.render(req, res, actualPage, req.query);
  });

  return router;
}