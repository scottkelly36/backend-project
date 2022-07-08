const request = require("supertest");
const app = require("../app");
const DB = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));

afterAll(() => {
  DB.end();
});

describe("GET categories", () => {
  test("each should have a property of slug and description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).not.toHaveLength(0);
        body.categories.forEach((category) => {
          expect(category).toHaveProperty("slug");
          expect(category).toHaveProperty("description");
        });
      });
  });
  test("each should have a property of slug and description with type of string", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).not.toHaveLength(0);
        body.categories.forEach((category) => {
          expect(typeof category.slug).toBe("string");
          expect(typeof category.description).toBe("string");
        });
      });
  });
  test("when spelling is incorrect return 404", () => {
    return request(app)
      .get("/api/cat")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry we cant find that end point");
      });
  });
});

describe("GET Reviews by id", () => {
  test("return the correct review", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.review.review_id).toBe(1);
        expect(body.review.title).toBe("Agricola");
        expect(body.review.designer).toBe("Uwe Rosenberg");
        expect(body.review.owner).toBe("mallionaire");
        expect(body.review.review_img_url).toBe(
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
        );
        expect(body.review.review_body).toBe("Farmyard fun!");
        expect(body.review.category).toBe("euro game");
        expect(body.review.votes).toBe(1);
      });
  });
  test("when passed a number that doesnt exsist return 404", () => {
    return request(app)
      .get("/api/reviews/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry Review cant be found");
      });
  });
  test("when passed incorrect data type", () => {
    return request(app)
      .get("/api/reviews/wrong")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry incorrect input");
      });
  });
});

describe("PATCH reviews/id", () => {
  test("when passed a vote obj increase the current votes by amount stated", () => {
    const vote = {
      inc_votes: 1,
    };

    return request(app)
      .patch("/api/reviews/1")
      .send(vote)
      .expect(200)
      .then(({ body }) => {
        expect(body.review.votes).toBe(2);
      });
  });
  test("when passed a neg vote obj increase the current votes by amount stated", () => {
    const vote = {
      inc_votes: -1,
    };

    return request(app)
      .patch("/api/reviews/1")
      .send(vote)
      .expect(200)
      .then(({ body }) => {
        expect(body.review.votes).toBe(0);
      });
  });
  test("when passed an invalid id return 404", () => {
    const vote = {
      inc_votes: 1,
    };

    return request(app)
      .get("/api/reviews/1000")
      .send(vote)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry Review cant be found");
      });
  });
  test("when passed incorrect data type for id", () => {
    const vote = {
      inc_votes: 1,
    };

    return request(app)
      .patch("/api/reviews/wrong")
      .send(vote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry incorrect input");
      });
  });
  test("when passed incorrect data type for inc_votes", () => {
    const vote = {
      inc_votes: "yes",
    };

    return request(app)
      .patch("/api/reviews/1")
      .send(vote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry incorrect datatype for votes");
      });
  });
});

describe("GET /api/reviews/id -comment_count", () => {
  test("return a review obj with comment count", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.review.comment_count).toBe("0");
      });
  });
  test("return a review obj checking for whole obj", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.review.review_id).toBe(1);
        expect(body.review.title).toBe("Agricola");
        expect(body.review.designer).toBe("Uwe Rosenberg");
        expect(body.review.owner).toBe("mallionaire");
        expect(body.review.review_img_url).toBe(
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
        );
        expect(body.review.review_body).toBe("Farmyard fun!");
        expect(body.review.category).toBe("euro game");
        expect(body.review.votes).toBe(1);
        expect(body.review.comment_count).toBe("0");
      });
  });
  test("test a different id", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.review.review_id).toBe(2);
        expect(body.review.title).toBe("Jenga");
        expect(body.review.designer).toBe("Leslie Scott");
        expect(body.review.owner).toBe("philippaclaire9");
        expect(body.review.review_img_url).toBe(
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
        );
        expect(body.review.review_body).toBe("Fiddly fun for all the family");
        expect(body.review.category).toBe("dexterity");
        expect(body.review.votes).toBe(5);
        expect(body.review.comment_count).toBe("3");
      });
  });
  test("when passed a number that doesnt exist return 404", () => {
    return request(app)
      .get("/api/reviews/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry Review cant be found");
      });
  });
});

describe("GET comments with review id", () => {
  test("200 return a filled array", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.comments).not.toHaveLength(0);
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("review_id");
        });
      });
  });
  test("200 but return an empty arr review found but no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(0);
      });
  });
  test("404 review cant be found", () => {
    return request(app)
      .get("/api/reviews/1000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry Review cant be found");
      });
  });
});

describe("Get /api/reviews?sortby", () => {
  test("200 returns all reviews with no query", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at");
        expect(body.reviews).not.toHaveLength(0);
        body.reviews.forEach((review) => {
          expect(review).toHaveProperty("review_id");
          expect(review).toHaveProperty("title");
          expect(review).toHaveProperty("designer");
          expect(review).toHaveProperty("owner");
          expect(review).toHaveProperty("review_img_url");
          expect(review).toHaveProperty("review_body");
          expect(review).toHaveProperty("category");
          expect(review).toHaveProperty("votes");
          expect(review).toHaveProperty("created_at");
        });
      });
  });

  test("check non default values sort_by", () => {
    return request(app)
      .get("/api/reviews?sort_by=review_id")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("review_id");
      });
  });

  test("check non default values order", () => {
    return request(app)
      .get("/api/reviews?order=DESC")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  test("check non default values together", () => {
    return request(app)
      .get("/api/reviews?sort_by=review_id&order=DESC")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("review_id", {
          descending: true,
        });
      });
  });

  test("when passed a category match category to reviews", () => {
    return request(app)
      .get("/api/reviews?category=euro+game")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at");
        expect(body.reviews).toHaveLength(1);
        body.reviews.forEach((review) => {
          expect(review.category).toBe("euro game");
        });
      });
  });
  test("when passed a category with no matches", () => {
    return request(app)
      .get("/api/reviews?category=yyy")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No reviews found");
      });
  });

  test("when passed a category that exists with no matches", () => {
    return request(app)
      .get("/api/reviews?category=children's+games")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No reviews found");
      });
  });

  test("400 invalid sort_by ", () => {
    return request(app)
      .get("/api/reviews?sort_by=face")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort_by");
      });
  });
  test("400 invalid sort_by ", () => {
    return request(app)
      .get("/api/reviews?order=kk")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order");
      });
  });
});
describe("Post add new comment review", () => {
  test("201 new comment was added", () => {
    const newComment = {
      username: "mallionaire",
      body: "I didn't know dogs could play games",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toHaveProperty("comment_id");
        expect(body.comment).toHaveProperty("body");
        expect(body.comment).toHaveProperty("votes");
        expect(body.comment).toHaveProperty("author");
        expect(body.comment).toHaveProperty("created_at");
        expect(body.comment).toHaveProperty("review_id");
      });
  });

  test("check that the user exists before posting", () => {
    const newComment = {
      username: "jim",
      body: "I didn't know dogs could play games",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("incorrect input");
      });
  });
  test("check that the body is the correct datatype", () => {
    const newComment = {
      username: "mallionaire",
      body: 0,
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("incorrect input");
      });
  });
  test("404 if wrong id is passed", () => {
    const newComment = {
      username: "mallionaire",
      body: "I didn't know dogs could play games",
    };
    return request(app)
      .post("/api/reviews/10000/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry review cant be found");
      });
  });
});
