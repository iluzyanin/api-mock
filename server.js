const express = require('express')
const proxy = require('express-http-proxy')
const next = require('next')
const url = require('url')
const _ = require('lodash')

const collectionsService = require('./service/collections')
const uiRoute = require('./routes/ui')
const collectionsRoute = require('./routes/collections')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || '3030'
const app = next({ dev })
const handle = app.getRequestHandler()

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

app
  .prepare()
  .then(collectionsService.initializeCollections)
  .then(() => {
    const server = express()

    server.use('/ui', uiRoute(app))

    server.use('/collections', collectionsRoute())

    server.get('/_next*', (req, res) => {
      return handle(req, res)
    })

    server.use('*', async (req, res, next) => {
      const collections = await collectionsService.getAll()
      const mocks = [].concat.apply([], collections.map(c => c.mocks))
      const foundMock = mocks
        .map(mock => ({
          ...mock,
          urlObj: url.parse(mock.url, true),
        }))
        .find(
          mock =>
            mock.urlObj.pathname === req.baseUrl &&
            mock.method === req.method &&
            _.isMatch(req.query, mock.urlObj.query)
        )

      if (foundMock) {
        if (foundMock.delay > 0) {
          await delay(foundMock.delay)
        }

        if (foundMock.proxyEnabled && foundMock.proxyUrl) {
          return proxy(foundMock.proxyUrl)(req, res, next)
        }

        res
          .status(foundMock.status)
          .set(foundMock.headers)
          .json(foundMock.data)
        return
      }
      res.status(404).end()
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}/ui`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
