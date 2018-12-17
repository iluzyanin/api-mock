const express = require('express');
const proxy = require('express-http-proxy');
const next = require('next');
const mockService = require('./service/mock');

const uiRoute = require('./routes/ui');
const mocksConfigurationRoute = require('./routes/mocksConfiguration');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || '3030';
const app = next({ dev });
const handle = app.getRequestHandler();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.prepare()
  .then(() => {
    const server = express();

    server.use('/ui', uiRoute(app));

    server.use('/mocks', mocksConfigurationRoute(app));

    server.get('/_next*', (req, res) => {
      return handle(req, res)
    });

    server.use('*', async (req, res, next) => {
      const mocks = await mockService.getAll();
      const foundMock = mocks.filter(mock => mock.url === req.baseUrl && mock.method === req.method)[0];
      if (foundMock) {
        if (foundMock.enabled) {
          if (foundMock.delay > 0) {
            await delay(foundMock.delay);
          }
          res.status(foundMock.status).json(foundMock.data);
          return;
        }
        if (foundMock.proxyUrl) {
          return proxy(foundMock.proxyUrl)(req, res, next);
        }
      }
      res.status(404).end();
    });

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}/ui`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })