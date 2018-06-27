const fs = require('fs');
const { promisify } = require('util');
const uuidv1 = require('uuid/v1');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getMocks = async () => JSON.parse(await readFile('mocks.json'));

const getMockById = async (mockId) => {
  const mocks = await getMocks();
  return mocks.find(m => m.id === mockId);
};

const addMock = async (newMock) => {
  const mocks = await getMocks();
  newMock.id = uuidv1();
  mocks.push(newMock);
  await writeFile('mocks.json', JSON.stringify(mocks, null, 2));
};

const deleteMock = async (mockId) => {
  const mocks = await getMocks();
  const newMocks = mocks.filter((mock) => mock.id !== mockId);
  const wasDeleted = newMocks.length < mocks.length;
  if (wasDeleted) {
    await writeFile('mocks.json', JSON.stringify(newMocks, null, 2));
  }
  return wasDeleted;
}

const updateMock = async (updatedMock) => {
  const mocks = await getMocks();
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
  getMocks,
  getMockById,
  addMock,
  deleteMock,
  updateMock,
};