const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const mockService = require('./service/mock');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

var jsonParser = bodyParser.json()

app.prepare()
  .then(() => {
    const server = express();

    server.get('/ui', (req, res) => {
      app.render(req, res, '/');
    });

    server.get('/ui/:pageName', (req, res) => {
      const actualPage = `/${req.params.pageName}`;
      app.render(req, res, actualPage, req.query);
    });

    server.get('/_next*', (req, res) => {
      return handle(req, res)
    });

    server.get('/mocks', async (req, res) => {
      try {
        const mocks = await mockService.getMocks();
        res.json(mocks);
      } catch (err) {
        console.error(err);
        res.json([]);
      }
    });

    server.get('/mocks/:mockId', async (req, res) => {
      try {
        const mocks = await mockService.getMocks();
        const mock = mocks.find(m => m.id === req.params.mockId);
        if (typeof mock !== 'undefined') {
          res.json(mock);
          return;
        }
        res.status(404).json({});
      } catch (err) {
        console.error(err);
        res.json({});
      }
    });

    server.post('/mocks', jsonParser, async (req, res) => {
      try {
        await mockService.addMock(req.body);
        res.status(201).json({});
      } catch (err) {
        console.error(err);
        res.status(500).json({});
      }
    });

    server.use('*', async (req, res) => {
      const mocks = await mockService.getMocks();
      const foundMock = mocks.filter(mock => mock.url === req.originalUrl && mock.method === req.method)[0];
      if (foundMock) {
        res.status(foundMock.status).json(foundMock.data);
        return;
      }
      res.json({ foo: 'bar' });
    });

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })