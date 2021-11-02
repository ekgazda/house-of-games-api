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
describe('GET /api/reviews/:review_id', () => {
  const output = {
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
    comment_count: 0,
  }
  test('status:200, responds with a single matching review, which has a comment_count property from comments table', () => {
    return request(app)
      .get(`/api/reviews/1`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(output)
      })
  })
  test('status:404, responds with error message if non-existing review_id is entered', () => {
    return request(app)
      .get(`/api/reviews/300000`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found')
      })
  })
  test('status:400, responds with error message for invalid review_id', () => {
    return request(app)
      .get(`/api/reviews/notAnId`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid input')
      })
  })
})
describe('PATCH /api/reviews/:review_id', () => {
  const voteAmount = { inc_votes: 10 }
  test('status:200, responds with a matching review object with its vote property updated', () => {
    const output = {
      review_id: 5,
      title: 'Proident tempor et.',
      designer: 'Seymour Buttz',
      owner: 'mallionaire',
      review_img_url:
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      review_body:
        'Labore occaecat sunt qui commodo anim anim aliqua adipisicing aliquip fugiat. Ad in ipsum incididunt esse amet deserunt aliqua exercitation occaecat nostrud irure labore ipsum. Culpa tempor non voluptate reprehenderit deserunt pariatur cupidatat aliqua adipisicing. Nostrud labore dolor fugiat sint consequat excepteur dolore irure eu. Anim ex adipisicing magna deserunt enim fugiat do nulla officia sint. Ex tempor ut aliquip exercitation eiusmod. Excepteur deserunt officia voluptate sunt aliqua esse deserunt velit. In id non proident veniam ipsum id in consequat duis ipsum et incididunt. Qui cupidatat ea deserunt magna proident nisi nulla eiusmod aliquip magna deserunt fugiat fugiat incididunt. Laboris nisi velit mollit ullamco deserunt eiusmod deserunt ea dolore veniam.',
      category: 'social deduction',
      created_at: new Date(1610010368077).toISOString(),
      votes: 15,
    }
    return request(app)
      .patch(`/api/reviews/5`)
      .send(voteAmount)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(output)
      })
  })
  test('status:400, responds with error message for invalid review_id', () => {
    return request(app)
      .patch(`/api/reviews/notAnId`)
      .send(voteAmount)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid input')
      })
  })
  test('status:400, responds with error when req.body input is incorrect data type', () => {
    return request(app)
      .patch(`/api/reviews/5`)
      .send({ inc_votes: 'ten' })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid input')
      })
  })
  test('status:404, responds with error message if non-existing review_id is entered', () => {
    return request(app)
      .patch(`/api/reviews/900000`)
      .send(voteAmount)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found')
      })
  })
})
