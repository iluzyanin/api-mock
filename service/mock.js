const fs = require('fs')
const { promisify } = require('util')
const { newId } = require('./idGenerator')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const MOCKS_FILE_NAME = 'newMocks.json'

const initializeMocks = async () => {
  if (!fs.existsSync(MOCKS_FILE_NAME)) {
    await writeFile(
      MOCKS_FILE_NAME,
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

const getAll = async () => JSON.parse(await readFile(MOCKS_FILE_NAME))

const getById = async mockId => {
  const mocks = await getAll()
  return mocks.find(m => m.id === mockId)
}

const add = async newMock => {
  const mocks = await getAll()
  newMock.id = newId()
  mocks.push(newMock)
  await writeFile(MOCKS_FILE_NAME, JSON.stringify(mocks, null, 2))
  return newMock.id
}

const remove = async mockId => {
  const mocks = await getAll()
  const newMocks = mocks.filter(mock => mock.id !== mockId)
  const wasDeleted = newMocks.length < mocks.length
  if (wasDeleted) {
    await writeFile(MOCKS_FILE_NAME, JSON.stringify(newMocks, null, 2))
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
    await writeFile(MOCKS_FILE_NAME, JSON.stringify(newMocks, null, 2))
  }
  return wasUpdated
}

module.exports = {
  initializeMocks,
  getAll,
  getById,
  add,
  remove,
  update,
}
