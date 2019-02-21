const router = require('express').Router()
const bodyParser = require('body-parser')
const collectionsService = require('../service/collections')

const jsonParser = bodyParser.json()

module.exports = () => {
  router.get('/', async (req, res) => {
    try {
      const mocks = await collectionsService.getAll()
      res.json(mocks)
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  })

  router.post('/', async (req, res) => {
    try {
      const id = await collectionsService.addCollection()
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
      const wasUpdated = await collectionsService.updateCollection(collectionId, newName)
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
      const wasDeleted = await collectionsService.removeCollection(collectionId)
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
      await collectionsService.move(mockId, oldCollectionId, newCollectionId)
      res.status(204).end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  router.post('/:collectionId/mocks/', async (req, res) => {
    try {
      const collectionId = req.params.collectionId
      const id = await collectionsService.add(collectionId)
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
      const id = await collectionsService.clone(collectionId, mockId)
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
      const wasUpdated = await collectionsService.update(collectionId, mockId, req.body)
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
      const wasDeleted = await collectionsService.remove(collectionId, mockId)
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
