const express = require("express");
const app = express();

const {
    getCategories
} = require("./controllers/categories.controllers");

//reviews controllers
const {
    getReviewById,
    patchReviewVotes,
    postReviewComment,
    getReviewComments,
    getReviews,
} = require("./controllers/reviews.controller");

//errors
const {
    getUsers
} = require("./controllers/users.controllers");

const {
    handleServerErrors,
    handleWrongEndpoint,
    handleNotFound,
    handleCustom,
} = require("./middleware/errors.middleware");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReviewVotes);
app.post("/api/reviews/comment", postReviewComment)
app.get("/api/reviews/:review_id/comments", getReviewComments);
app.get("/api/reviews", getReviews);

app.get("/api/users", getUsers);

app.use("*", (req, res) => {
    res.status(404).send({
        msg: "Sorry we cant find that end point",
    });
});

app.use(handleNotFound);
app.use(handleCustom);
app.use(handleServerErrors);

module.exports = app;