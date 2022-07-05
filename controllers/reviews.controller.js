const {
    selectReviewById,
    updateReviewVotes
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