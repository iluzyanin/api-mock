const fs = require('fs');
const { promisify } = require('util');
const uuidv1 = require('uuid/v1');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getAll = async () => JSON.parse(await readFile('mocks.json'));

const getById = async (mockId) => {
  const mocks = await getAll();
  return mocks.find(m => m.id === mockId);
};

const add = async (newMock) => {
  const mocks = await getAll();
  newMock.id = uuidv1();
  mocks.push(newMock);
  await writeFile('mocks.json', JSON.stringify(mocks, null, 2));
};

const remove = async (mockId) => {
  const mocks = await getAll();
  const newMocks = mocks.filter((mock) => mock.id !== mockId);
  const wasDeleted = newMocks.length < mocks.length;
  if (wasDeleted) {
    await writeFile('mocks.json', JSON.stringify(newMocks, null, 2));
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
    await writeFile('mocks.json', JSON.stringify(newMocks, null, 2));
  }
  return wasUpdated;
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};