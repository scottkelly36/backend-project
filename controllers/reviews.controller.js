const {
    selectReviewById,
    updateReviewVotes,
    selectReviewComments,
    selectReviews,
    insertReviewComment
} = require("../models/review.model");

exports.getReviewById = (req, res, next) => {
    const {
        review_id
    } = req.params;

    selectReviewById(review_id)
        .then((review) => {
            res.status(200).send({
                review,
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.patchReviewVotes = (req, res, next) => {
    const {
        review_id
    } = req.params;
    const body = req.body;
    updateReviewVotes(review_id, body)
        .then((updatedReview) => {
            res.status(200).send({
                review: updatedReview,
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.getReviewComments = (req, res, next) => {
    const {
        review_id
    } = req.params;

    const checkId = selectReviewById(review_id);
    const results = selectReviewComments(review_id);

    Promise.all([checkId, results])
        .then((values) => {
            res.status(200).send({
                comments: values[1],
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.getReviews = (req, res, next) => {
    const {
        sort_by,
        order,
        category
    } = req.query;

    selectReviews(sort_by, order, category)
        .then((reviews) => {
            res.status(200).send({
                reviews
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.postReviewComment = (req, res, next) => {
    const body = req.body;
    const {
        review_id
    } = req.params;

    const checkReviewId = selectReviewById(review_id);
    const checkUser = checkExists("users", "username", body.username);

    Promise.all([checkReviewId, checkUser])
        .then((values) => {
            return values[1];
        })
        .then((result) => {
            if (result > 0 && typeof body.body === "string") {
                insertReviewComment(body, review_id).then((newComment) => {
                    res.status(201).send({
                        comment: newComment
                    });
                });
            } else {
                res.status(400).send({
                    msg: "incorrect input"
                });
            }
        })
        .catch((err) => {
            next(err);
        });
};