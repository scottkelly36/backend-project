const DB = require("../db/connection");

exports.selectReviewById = (id) => {
  return DB.query(
    `
    SELECT reviews.*, COUNT(comments.*) AS comment_count
    FROM reviews
    LEFT JOIN comments ON
    reviews.review_id=comments.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;
    `,
    [id]
  ).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Sorry Review cant be found",
      });
    } else {
      return result.rows[0];
    }
  });
};

exports.updateReviewVotes = (id, body) => {
  const {
    inc_votes
  } = body;
  if (typeof inc_votes !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Sorry incorrect datatype for votes",
    });
  }

  return DB.query(
    `UPDATE reviews SET votes = votes+$1 WHERE review_id = $2 RETURNING *`,
    [inc_votes, id]
  ).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Sorry Review cant be found",
      });
    } else {
      return result.rows[0];
    }
  });
};

exports.selectReviewComments = (id) => {
  return DB.query(`SELECT * FROM comments WHERE review_id =$1`, [id]).then(
    (result) => {
      return result.rows;
    }
  );
};

exports.selectReviews = (sort_by = "created_at", order = "ASC", category) => {

  const queryValues = [];
  const validSortBy = [
    "created_at",
    "review_id",
    "title",
    "designer",
    "owner",
    "votes",
    "category",
  ];
  const validOrder = ["ASC", "DESC"];

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid sort_by",
    });
  }

  if (!validOrder.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid order",
    });
  }

  let queryString = `SELECT * FROM reviews`;

  if (category) {
    queryValues.push(category);
    queryString += ` WHERE category = $${queryValues.length}`;
  }

  if (sort_by || order) {
    queryString += ` ORDER BY ${sort_by} ${order}`;
  }

  return DB.query(queryString, queryValues).then((results) => {
    if (results.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No reviews found"
      });
    } else {
      return results.rows;
    }
  });
};