const {
    selectReviewById,
    updateReviewVotes,
    <<
    << << < HEAD
    selectReviewComments ===
    === =
    selectReviews >>>
    >>> > 4 a05994317e584250c26a284d2dedafd320bf0a8
} = require('../models/review.model');


exports.getReviewById = (req, res, next) => {
    const {
        review_id
    } = req.params;

    selectReviewById(review_id).then((review) => {

        res.status(200).send({
            review
        })
    }).catch((err) => {
        next(err)
    })
}

exports.patchReviewVotes = (req, res, next) => {
    const {
        review_id
    } = req.params;
    const body = req.body;
    updateReviewVotes(review_id, body).then((updatedReview) => {
        res.status(200).send({
            review: updatedReview
        })
    }).catch((err) => {
        next(err)
    })
}

exports.getReviewComments = (req, res, next) => {
    const {
        review_id
    } = req.params;
    selectReviewComments(review_id).then((comments) => {
        res.status(200).send({
            comments
        })
    }).catch((err) => {
        next(err)
    })
}