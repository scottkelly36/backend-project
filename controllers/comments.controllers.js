const { removeComment } = require("../models/comment.model");
const { checkExists } = require("../utils/utils");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  const checkId = checkExists("comments", "comment_id", comment_id);

  Promise.resolve(checkId)
    .then((result) => {
      if (result === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment cant be found",
        });
      } else {
        return;
      }
    })
    .then(() => {
      return removeComment(comment_id);
    })
    .then((result) => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};
