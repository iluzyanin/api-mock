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

  router.post('/', async (req, res) => {
    try {
      const id = await mockService.addCollection()
      res
        .status(201)
        .set('Location', id)
        .end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  router.patch('/:collectionId', jsonParser, async (req, res) => {
    try {
      const collectionId = req.params.collectionId
      const newName = req.body.name || 'test!'
      const wasUpdated = await mockService.updateCollection(collectionId, newName)
      if (wasUpdated) {
        res.status(204).end()
        return
      }
      res.status(404).json({ message: `Collection with id ${collectionId} was not found` })
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  })

  router.delete('/:collectionId', async (req, res) => {
    try {
      const collectionId = req.params.collectionId
      const wasDeleted = await mockService.removeCollection(collectionId)
      if (wasDeleted) {
        res.status(204).end()
        return
      }
      res.status(404).json({ message: `Collection with id ${collectionId} was not found` })
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  })

  router.patch('/:collectionId/mocks/:mockId', jsonParser, async (req, res) => {
    try {
      const mockId = req.params.mockId
      const oldCollectionId = req.params.collectionId
      const newCollectionId = req.body.newCollectionId
      await mockService.move(mockId, oldCollectionId, newCollectionId)
      res.status(204).end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  router.post('/:collectionId/mocks/', async (req, res) => {
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

  router.post('/:collectionId/mocks/:mockId', async (req, res) => {
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

  router.put('/:collectionId/mocks/:mockId', jsonParser, async (req, res) => {
    try {
      const mockId = req.params.mockId
      const collectionId = req.params.collectionId
      const wasUpdated = await mockService.update(collectionId, mockId, req.body)
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
      const wasDeleted = await mockService.remove(collectionId, mockId)
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
