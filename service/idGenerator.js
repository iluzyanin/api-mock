module.exports = {
  newId: (length = 10) =>
    Math.random()
      .toString(16)
      .substr(2, length),
}
