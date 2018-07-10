const express = require('express');
const next = require('next');
const mockService = require('./service/mock');

const uiRoute = require('./routes/ui');
const mocksConfigurationRoute = require('./routes/mocksConfiguration');

const config = require('./config');

const dev = process.env.NODE_ENV !== 'production';
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

    server.use('*', async (req, res) => {
      const mocks = await mockService.getAll();
      const foundMock = mocks.filter(mock => mock.url === req.originalUrl && mock.method === req.method)[0];
      if (foundMock && foundMock.enabled) {
        if (foundMock.delay > 0) {
          await delay(foundMock.delay);
        }
        res.status(foundMock.status).json(foundMock.data);
        return;
      }
      res.status(404).end();
    });

    server.listen(config.port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${config.port}/ui`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })