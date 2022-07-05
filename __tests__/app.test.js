const request = require("supertest");
const app = require('../app');
const DB = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => seed(
    testData
));


afterAll(() => {
    DB.end()
})



describe("GET categories", () => {
    test('each should have a property of slug and description', () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then(({
                body
            }) => {
                body.categories.forEach((category) => {
                    expect(category).toHaveProperty("slug");
                    expect(category).toHaveProperty("description");
                })
            })
    });
    test('each should have a property of slug and description with type of string', () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then(({
                body
            }) => {
                expect(body.categories).not.toHaveLength(0);
                body.categories.forEach((category) => {
                    expect(typeof category.slug).toBe("string");
                    expect(typeof category.description).toBe("string");
                })
            })
    });
    test('when spelling is incorrect return 404', () => {
        return request(app)
            .get("/api/cat")
            .expect(404)
            .then(({
                body
            }) => {
                expect(body.msg).toBe("Sorry we cant find that end point")
            })
    });


})

describe('GET Reviews by id', () => {
    test('return the correct review', () => {
        return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then(({
                body
            }) => {
                expect(body.review.review_id).toBe(1)
                expect(body.review.title).toBe('Agricola')
                expect(body.review.designer).toBe('Uwe Rosenberg')
                expect(body.review.owner).toBe('mallionaire')
                expect(body.review.review_img_url).toBe('https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png')
                expect(body.review.review_body).toBe('Farmyard fun!')
                expect(body.review.category).toBe('euro game')
                expect(body.review.votes).toBe(1)

            })
    });
    test('when passed a number that doesnt exsist return 404', () => {
        return request(app)
            .get("/api/reviews/1000")
            .expect(404)
            .then(({
                res
            }) => {
                expect(res.text)
                    .toBe("Sorry Review cant be found")
            })
    });
    test('when passed incorrect data type', () => {
        return request(app)
            .get("/api/reviews/wrong")
            .expect(400)
            .then(({
                body
            }) => {
                expect(body.msg)
                    .toBe("Sorry incorrect input")
            })

    })
})

describe('PATCH reviews/id', () => {
    test('when passed a vote obj increase the current votes by amount stated', () => {

        const vote = {
            inc_votes: 1
        }


        return request(app)
            .patch("/api/reviews/1")
            .send(vote)
            .expect(200)
            .then(({
                body
            }) => {
                console.log(body)
                expect(body.review.votes).toBe(2)
            })
    })
    test('when passed a neg vote obj increase the current votes by amount stated', () => {

        const vote = {
            inc_votes: -1
        }


        return request(app)
            .patch("/api/reviews/1")
            .send(vote)
            .expect(200)
            .then(({
                body
            }) => {
                console.log(body)
                expect(body.review.votes).toBe(0)
            })
    })
    test('when passed an invalid id return 404', () => {
        const vote = {
            inc_votes: 1
        }

        return request(app)
            .get("/api/reviews/1000")
            .send(vote)
            .expect(404)
            .then(({
                res
            }) => {
                expect(res.text)
                    .toBe("Sorry Review cant be found")
            })
    });
    test('when passed incorrect data type for id', () => {
        const vote = {
            inc_votes: 1
        }

        return request(app)
            .patch("/api/reviews/wrong")
            .send(vote)
            .expect(400)
            .then(({
                body
            }) => {
                console.log(body.msg)
                expect(body.msg)
                    .toBe("Sorry incorrect input")
            })

    })
    test('when passed incorrect data type for inc_votes', () => {
        const vote = {
            inc_votes: 1
        }

        return request(app)
            .patch("/api/reviews/wrong")
            .send(vote)
            .expect(400)
            .then(({
                body
            }) => {
                expect(body.msg).toBe("Sorry incorrect input")

            })

    })
})