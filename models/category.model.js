const DB = require("../db/connection");

exports.selectCategories = () => {
    return DB.query(`SElECT * from categories`)
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Sorry categories cant be found"
                })
            }
            return result.rows
        })
}