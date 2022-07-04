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
                console.log(
                    body.msg
                )
                expect(body.msg).toBe("Sorry we cant find that end point")
            })
    });
})