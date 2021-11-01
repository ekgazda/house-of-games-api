const request = require('supertest')
const app = require('../app')
const db = require('../db/connection.js')
const testData = require('../db/data/test-data/index.js')
const seed = require('../db/seeds/seed.js')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('app testing', () => {
  it('status:404, responds with message path not found', () => {
    return request(app)
      .get('/api/notPath')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('path not found')
      })
  })
})
describe('GET /api/categories', () => {
  test('status:200, responds with an array of categories objects', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({ body }) => {
        const { categories } = body
        expect(categories).toBeInstanceOf(Array)
        expect(categories).toHaveLength(4)
        categories.forEach((category) =>
          expect(category).toEqual({
            slug: expect.any(String),
            description: expect.any(String),
          }),
        )
      })
  })
})
describe.only('GET /api/reviews/:review_id', () => {
  test('status:200, responds with a single matching review object', () => {
    return request(app)
      .get(`/api/reviews/1`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          review_id: 1,
          title: 'Agricola',
          designer: 'Uwe Rosenberg',
          owner: 'mallionaire',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          review_body: 'Farmyard fun!',
          category: 'euro game',
          created_at: new Date(1610964020514).toISOString(),
          votes: 1,
        })
      })
  })
})
