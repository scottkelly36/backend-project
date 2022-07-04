const express = require('express');
const app = express();

const {
    getCategories
} = require('./controllers/categories.controllers');

const {
    handleServerErrors,
    handleWrongEndpoint,

} = require('./middleware/errors.middleware');


app.use(express.json());


app.get('/api/categories', getCategories);


app.all('/*', (req, res) => {
    res.status(404).send({
        msg: "Sorry we cant find that end point"
    })
});
app.use(handleServerErrors);


module.exports = app;