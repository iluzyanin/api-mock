const fs = require('fs');
const { promisify } = require('util');
const uuidv1 = require('uuid/v1');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getMocks = async () => JSON.parse(await readFile('mocks.json'));

const addMock = async (newMock) => {
  const mocks = await getMocks();
  newMock.id = uuidv1();
  mocks.push(newMock);
  await writeFile('mocks.json', JSON.stringify(mocks, null, 2));
};

module.exports = {
  getMocks,
  addMock
};