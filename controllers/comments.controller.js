const {
    destroyComment
} = require('../models/comment.model');

exports.deleteComment = (req, res, next) => {
    const {
        comment_id
    } = req.params;
    destroyComment(comment_id).then((result) => {
        res.status(204).send(result)
    })
}