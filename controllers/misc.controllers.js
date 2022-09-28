const fs = require("fs/promises");

exports.getEndpoints = (req, res, next) => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((result) => {
    res.status(200).send({
      endpoints: JSON.parse(result)
    });
  });
};