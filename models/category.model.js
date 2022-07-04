const DB = require("../db/connection");

exports.selectCategories = () => {
    return DB.query(`SElECT * from categories`)
        .then((categories) => {
            return categories.rows
        })
}