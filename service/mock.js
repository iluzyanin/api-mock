const fs = require('fs')
const { promisify } = require('util')
const { newId } = require('./idGenerator')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const COLLECTIONS_FILE_NAME = 'collections.json'

const initializeMocks = async () => {
  if (!fs.existsSync(COLLECTIONS_FILE_NAME)) {
    await writeFile(
      COLLECTIONS_FILE_NAME,
      JSON.stringify(
        [
          {
            name: 'Fruits',
            id: newId(),
            mocks: [
              {
                id: newId(),
                url: '/fruits',
                method: 'GET',
                description: 'Get all fruits',
                status: 200,
                delay: 0,
                proxyUrl: '',
                proxyEnabled: false,
                headers: {},
                data: [
                  {
                    id: 1,
                    name: 'apple',
                  },
                  {
                    id: 2,
                    name: 'banana',
                  },
                ],
              },
            ],
          },
        ],
        null,
        2
      )
    )
  }

  return Promise.resolve()
}

const sortBy = propName => (a, b) => {
  if (!a[propName]) {
    return 1
  }

  return a[propName].localeCompare(b[propName])
}

const getAll = async () => {
  const collections = JSON.parse(await readFile(COLLECTIONS_FILE_NAME))
  return collections.sort(sortBy('name')).map(collection => ({
    ...collection,
    mocks: collection.mocks.sort(sortBy('description')),
  }))
}

const getById = async mockId => {
  const collections = await getAll()
  return collections.find(m => m.id === mockId)
}

const add = async newMock => {
  const collections = await getAll()
  newMock.id = newId()
  collections.push(newMock)
  await writeFile(COLLECTIONS_FILE_NAME, JSON.stringify(collections, null, 2))
  return newMock.id
}

const clone = async (collectionId, mockId) => {
  const collections = await getAll()
  const collection = collections.find(collection => collection.id === collectionId)
  if (!collection) {
    return null
  }
  const mock = collection.mocks.find(mock => mock.id === mockId)
  if (!mock) {
    return null
  }
  const newMockId = newId()
  collection.mocks.push({
    ...mock,
    id: newMockId,
    description: `${mock.description} COPY`,
  })
  await writeFile(COLLECTIONS_FILE_NAME, JSON.stringify(collections, null, 2))
  return newMockId
}

const remove = async (collectionId, mockId) => {
  const collections = await getAll()
  const collection = collections.find(collection => collection.id === collectionId)
  if (!collection) {
    return false
  }
  const remainingMocks = collection.mocks.filter(mock => mock.id !== mockId)
  const wasDeleted = remainingMocks.length < collection.mocks.length
  if (wasDeleted) {
    collection.mocks = remainingMocks
    await writeFile(COLLECTIONS_FILE_NAME, JSON.stringify(collections, null, 2))
  }

  return wasDeleted
}

const update = async updatedMock => {
  const mocks = await getAll()
  let wasUpdated = false

  const newMocks = mocks.map(mock => {
    if (mock.id === updatedMock.id) {
      wasUpdated = true
      return updatedMock
    }
    return mock
  })
  if (wasUpdated) {
    await writeFile(COLLECTIONS_FILE_NAME, JSON.stringify(newMocks, null, 2))
  }
  return wasUpdated
}

module.exports = {
  initializeMocks,
  getAll,
  getById,
  add,
  clone,
  remove,
  update,
}
