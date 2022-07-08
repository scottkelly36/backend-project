const {
  removeComment
} = require("../models/comment.model");

const {
  checkExists
} = require("../utils/utils");

exports.deleteComment = (req, res, next) => {
  const {
    comment_id
  } = req.params;

  return checkExists("comments", "comment_id", comment_id).then((result) => {

      if (result === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment cant be found",
        });
      }
    })
    .then(() => {
      return removeComment(comment_id);
    })
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });


};