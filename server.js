const express = require('express')
const proxy = require('express-http-proxy')
const next = require('next')
const url = require('url')
const _ = require('lodash')

const mockService = require('./service/mock')
const uiRoute = require('./routes/ui')
const mocksConfigurationRoute = require('./routes/mocksConfiguration')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || '3030'
const app = next({ dev })
const handle = app.getRequestHandler()

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

app
  .prepare()
  .then(mockService.initializeMocks)
  .then(() => {
    const server = express()

    server.use('/ui', uiRoute(app))

    server.use('/mocks', mocksConfigurationRoute())

    server.get('/_next*', (req, res) => {
      return handle(req, res)
    })

    server.use('*', async (req, res, next) => {
      const mocks = await mockService.getAll()
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
