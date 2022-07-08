const fs = require("fs/promises");

exports.getEndpoints = (req, res, next) => {
  return fs.readFile("./endpoints.json", "utf8").then((result) => {
    res.status(200).send({ endpoints: JSON.parse(result) });
  });
};
