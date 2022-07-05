const DB = require("../db/connection");

exports.selectUsers = () => {
    return DB.query(`SELECT * from users`).then((result) => {
        return result.rows;
    })
}