const DB = require("../db/connection");

exports.selectCategories = () => {
    return DB.query(`SElECT * from categories`)
        .then((categories) => {
            return categories.rows
        })
}

exports.selectReviewById = (id) => {
    return DB.query(`SELECT * from reviews WHERE review_id = $1`, [id]).then((review) => {
        if (review.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "Sorry Review cant be found"
            });
        } else {
            return review.rows[0];
        }

    })
}