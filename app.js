const express = require('express');
const app = express();

//categories controllers
const {
    getCategories,
} = require('./controllers/categories.controllers');

//reviews controllers
const {
    getReviewById,
    patchReviewVotes,
    getReviewComments,
    postReviewComment
} = require('./controllers/reviews.controller');

//users controllers
const {
    getUsers
} = require('./controllers/users.controllers');

//comment controllers
const {
    deleteComment
} = require('./controllers/comments.controller');

//errors
const {
    handleServerErrors,
    handleWrongEndpoint,
    handleNotFound,
    handleCustom,

} = require('./middleware/errors.middleware');


app.use(express.json());


app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReviewById);
app.patch('/api/reviews/:review_id', patchReviewVotes);
app.get('/api/reviews/:review_id/comments', getReviewComments);
app.post('/api/reviews/:review_id/comments', postReviewComment);

app.get('/api/users', getUsers);

app.delete('/api/comments/:comment_id', deleteComment);


app.use('*', (req, res) => {
    res.status(404).send({
        msg: "Sorry we cant find that end point"
    })
});


app.use(handleNotFound);
app.use(handleCustom)
app.use(handleServerErrors);



module.exports = app;