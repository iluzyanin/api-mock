const router = require('express').Router()
const bodyParser = require('body-parser')
const mockService = require('../service/mock')

const jsonParser = bodyParser.json()

module.exports = () => {
  router.get('/', async (req, res) => {
    try {
      const mocks = await mockService.getAll()
      res.json(mocks)
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  })

  router.post('/', jsonParser, async (req, res) => {
    try {
      const id = await mockService.add(req.body)
      res
        .status(201)
        .set('Location', id)
        .end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  router.get('/:mockId', async (req, res) => {
    try {
      const mockId = req.params.mockId
      const mock = await mockService.getById(mockId)
      if (typeof mock !== 'undefined') {
        res.json(mock)
        return
      }
      res.status(404).json({ message: `Mock with id ${mockId} was not found` })
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  })

  router.put('/:mockId', jsonParser, async (req, res) => {
    try {
      const wasUpdated = await mockService.update(req.body)
      if (wasUpdated) {
        res.status(204).end()
        return
      }
      res.status(404).json({ message: `Mock with id ${mockId} was not found` })
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  router.delete('/:mockId', async (req, res) => {
    try {
      const mockId = req.params.mockId
      const wasDeleted = mockService.remove(mockId)
      if (wasDeleted) {
        res.status(204).end()
        return
      }
      res.status(404).json({ message: `Mock with id ${mockId} was not found` })
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  })

  return router
}
