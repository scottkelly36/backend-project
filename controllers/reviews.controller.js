const {
    selectReviewById,
    updateReviewVotes,
    selectReviewComments,
    selectReviews

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

    const checkId = selectReviewById(review_id)
    const results = selectReviewComments(review_id)

    Promise.all([checkId, results]).then((values) => {
            res.status(200).send({
                comments: values[1]
            })
        })
        .catch((err) => {
            next(err)
        })
}