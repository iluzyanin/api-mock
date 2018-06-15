const micro = require('micro')
const express = require('express')
const next = require('next')
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        //   const server = micro(async (req, res) => {
        //     console.dir(req.url);

        //     return handle(req, res);
        //   });

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
                console.log(mocks)
                res.json(mocks);
            } catch(err) {
                console.error(err);
                res.json([]);
            }
        });

        server.get('*', (req, res) => {
            res.json({ foo: 'bar ' });
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