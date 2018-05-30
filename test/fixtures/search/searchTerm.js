const defualt = { queryString: "John Dalli" };

const constraints = {
  ...defualt,
  constraints: ["TEST", "TEST2"]
};

const resultContext = {
  ...defualt,
  maxResults: 11,
  offset: 1
};

module.exports = {
  defualt,
  constraints,
  resultContext
};
