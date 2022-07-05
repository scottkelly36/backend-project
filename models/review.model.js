const DB = require("../db/connection");

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

exports.updateReviewVotes = (id, body) => {
    const {
        inc_votes
    } = body
    if (typeof inc_votes !== "number") {
        return Promise.reject({
            status: 400,
            msg: 'Sorry incorrect datatype for votes'
        })
    }


    return DB.query(`UPDATE reviews SET votes = votes+$1 WHERE review_id = $2 RETURNING *`, [inc_votes, id]).then((result) => {
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