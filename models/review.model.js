const DB = require("../db/connection");


exports.selectReviewById = (id) => {

    return DB.query(`
    SELECT reviews.*, COUNT(comments.*) AS comment_count
    FROM reviews
    LEFT JOIN comments ON
    reviews.review_id=comments.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;
    `, [id])
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

exports.selectReviewComments = (id) => {
    return DB.query(`SELECT * FROM comments WHERE review_id =$1`, [id]).then((result) => {
        return result.rows;
    })
}

exports.insertReviewComment = (data, id) => {
    const {
        username,
        body
    } = data
    const created = new Date();

    if (typeof body !== "string") {
        return Promise.reject({
            status: 400,
            msg: 'Body has to be string'
        })
    }

    return DB.query(`INSERT INTO comments
    (body, votes, author, review_id, created_at)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *`, [body, 0, username, id, created]).then((result) => {
        return result.rows;
    })


}