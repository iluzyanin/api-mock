const fs = require('fs');
const { promisify } = require('util');
const uuidv1 = require('uuid/v1');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const MOCKS_FILE_NAME = 'mocks.json';

const initializeMocks = () => {
  if (!fs.existsSync(MOCKS_FILE_NAME)) {
    return writeFile(MOCKS_FILE_NAME, JSON.stringify([{
      url: '/fruits',
      method: 'GET',
      data: [{
        'id': 1,
        'name': 'apple'
      }, {
        'id': 2,
        'name': 'banana'
      }],
      status: 200,
      delay: 0,
      enabled: true,
      id: 'b1f61900-029c-11e9-8908-13eee40b1caf',
      description: 'Get fruits'
    }], null, 2));
  }

  return Promise.resolve();
}

const getAll = async () => JSON.parse(await readFile(MOCKS_FILE_NAME));

const getById = async (mockId) => {
  const mocks = await getAll();
  return mocks.find(m => m.id === mockId);
};

const add = async (newMock) => {
  const mocks = await getAll();
  newMock.id = uuidv1();
  mocks.push(newMock);
  await writeFile(MOCKS_FILE_NAME, JSON.stringify(mocks, null, 2));
  return newMock.id;
};

const remove = async (mockId) => {
  const mocks = await getAll();
  const newMocks = mocks.filter((mock) => mock.id !== mockId);
  const wasDeleted = newMocks.length < mocks.length;
  if (wasDeleted) {
    await writeFile(MOCKS_FILE_NAME, JSON.stringify(newMocks, null, 2));
  }
  return wasDeleted;
}

const update = async (updatedMock) => {
  const mocks = await getAll();
  let wasUpdated = false;

  const newMocks = mocks.map((mock) => {
    if (mock.id === updatedMock.id) {
      wasUpdated = true;
      return updatedMock;
    }
    return mock;
  });
  if (wasUpdated) {
    await writeFile(MOCKS_FILE_NAME, JSON.stringify(newMocks, null, 2));
  }
  return wasUpdated;
}

module.exports = {
  initializeMocks,
  getAll,
  getById,
  add,
  remove,
  update,
};