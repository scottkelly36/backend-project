const DB = require("../db/connection");
const format = require("pg-format");

exports.checkExists = (table, column, value) => {
  const queryString = format(`SELECT * FROM %I WHERE %I = $1`, table, column);
  return DB.query(queryString, [value]).then((result) => {
    return result.rowCount;
  });
};
