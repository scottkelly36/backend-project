const express = require('express');
const app = express();

const {
    getCategories,
} = require('./controllers/categories.controllers');

const {
    getReviewById,
    patchReviewVotes
} = require('./controllers/reviews.controller');

const {
    handleServerErrors,
    handleWrongEndpoint,
    patchReviewVotes

} = require('./middleware/errors.middleware');


app.use(express.json());


app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewById);
app.patch('/api/reviews/:review_id', patchReviewVotes);


app.all('/*', (req, res) => {
    res.status(404).send({
        msg: "Sorry we cant find that end point"
    })
});
app.use(handleServerErrors);


module.exports = app;