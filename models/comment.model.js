const DB = require("../db/connection");
const { checkExists } = require("../utils/utils");

exports.removeComment = (id) => {
  return DB.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
    id,
  ]).then((result) => {
    return result.rows;
  });
};
