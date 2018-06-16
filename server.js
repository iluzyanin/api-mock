const express = require('express');
const next = require('next');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express()

    server.get('/', (req, res) => {
      return handle(req, res)
    });

    server.get('/_next*', (req, res) => {
      return handle(req, res)
    });

    server.get('/mocks', async (req, res) => {
      try {
        const mocks = require('./mocks');
        res.json(mocks);
      } catch (err) {
        console.error(err);
        res.json([]);
      }
    });

    server.use('*', async (req, res) => {
      const mocks = JSON.parse(await readFile('mocks.json'));
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