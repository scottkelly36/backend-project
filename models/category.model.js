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

exports.selectReviewById = (id) => {
    return DB.query(`SELECT * from reviews WHERE review_id = $1`, [id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Sorry Review cant be found"
                });
            } else {
                return result.rows[0];
            }

        })
}