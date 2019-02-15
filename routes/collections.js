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

  router.post('/:collectionId/mocks/', jsonParser, async (req, res) => {
    try {
      const collectionId = req.params.collectionId
      const id = await mockService.add(collectionId)
      if (id) {
        res
          .status(201)
          .set('Location', id)
          .end()
        return
      }
      res.status(404).json({ message: `Collection ${collectionId} was not found` })
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  router.post('/:collectionId/mocks/:mockId', jsonParser, async (req, res) => {
    try {
      const mockId = req.params.mockId
      const collectionId = req.params.collectionId
      const id = await mockService.clone(collectionId, mockId)
      if (id) {
        res
          .status(201)
          .set('Location', id)
          .end()
        return
      }
      res
        .status(404)
        .json({ message: `Mock ${mockId} was not found in collection ${collectionId}` })
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

  router.delete('/:collectionId/mocks/:mockId', async (req, res) => {
    try {
      const mockId = req.params.mockId
      const collectionId = req.params.collectionId
      const wasDeleted = mockService.remove(collectionId, mockId)
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
