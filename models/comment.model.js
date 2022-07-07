const DB = require("../db/connection");
const {
    checkExists
} = require("../utils/utils");


exports.destroyComment = (id) => {
    const checkCommentExists = checkExists("comments", "comment_id", id);

    Promise.resolve(checkCommentExists).then((result) => {
        if (result === 0) {
            return Promise.reject({
                status: 404,
                msg: "Comment cant be found"
            })
        } else {
            return DB.query(`DELETE FROM comments WHERE comment_id = $1`, [id])
                .then((result) => {
                    console.log(result)
                })
        }
    })
}