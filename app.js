const express = require('express');
const app = express();

const {
    getCategories,
    getReviewById
} = require('./controllers/categories.controllers');

const {
    handleServerErrors,
    handleWrongEndpoint,
    handleNotFound,

} = require('./middleware/errors.middleware');


app.use(express.json());


app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewById);


app.use('*', (req, res) => {
    res.status(404).send({
        msg: "Sorry we cant find that end point"
    })
});


app.use(handleNotFound);

app.use(handleServerErrors);



module.exports = app;