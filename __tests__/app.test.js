const request = require('supertest')
const app = require('../app')
const db = require('../db/connection.js')
const testData = require('../db/data/test-data/index.js')
const seed = require('../db/seeds/seed.js')
const endpoints = require("../endpoints.json");

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
  test('status:200, responds with a single matching review, which has a `comment_count` property from comments table', () => {
    return request(app)
      .get(`/api/reviews/1`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(output)
        expect(body.review.comment_count).toBe(0)
      })
  })
  test('status:404, responds with error message if non-existing `review_id` is entered', () => {
    return request(app)
      .get(`/api/reviews/300000`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('review not found')
      })
  })
  test('status:400, responds with error message for invalid `review_id`', () => {
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
  test('status:200, responds with a matching review object with its `vote` property updated', () => {
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
  test('status:400, responds with error message for invalid `review_id`', () => {
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
  test('status:404, responds with error message if non-existing `review_id` is entered', () => {
    return request(app)
      .patch(`/api/reviews/900000`)
      .send(voteAmount)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('review not found')
      })
  })
})
describe('GET /api/reviews', () => {
  test('status:200, responds with an array of reviews objects, which have a `comment_count` property', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body
        expect(reviews).toBeInstanceOf(Array)
        expect(reviews).toHaveLength(13)
        expect(reviews[0].hasOwnProperty('comment_count')).toBe(true)
        reviews.forEach((review) =>
          expect(review).toEqual({
            review_id: expect.any(Number),
            title: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            review_body: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          }),
        )
      })
  })
  test('status:200, accepts sort query and responds with reviews sorted by the query criteria', () => {
    const sortCriteria = 'title'
    return request(app)
      .get(`/api/reviews?sort_by=${sortCriteria}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy(`${sortCriteria}`, {
          descending: true,
        })
      })
  })
  test('status:400, responds with error for invalid sort query', () => {
    return request(app)
      .get('/api/reviews?sort_by=notacolumn')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid query')
      })
  })
  test('status:200, accepts order query and responds with reviews sorted', () => {
    return request(app)
      .get(`/api/reviews?sort_by=created_at&order=asc`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy('created_at')
      })
  })
  test('status:200, default sort & order queries are `created_at` and `desc`', () => {
    return request(app)
      .get(`/api/reviews?sort+by`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy('created_at', {descending: true})
  })
})
  test('status:400, responds with error for invalid order query', () => {
    return request(app)
      .get('/api/reviews?order=notanorder')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid query')
      })
  })
  test('status:200, accepts category query and responds with reviews filtered', () => {
    const categoryFilter = 'social deduction'
    return request(app)
      .get(`/api/reviews?category=${categoryFilter}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toHaveLength(11)
      })
  })
  test('status:200, responds with an empty array for a valid `category` query which has no reviews', () => {
    const categoryFilter = 'children\'s games'
    return request(app)
      .get(`/api/reviews?category=${categoryFilter}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toEqual([])
      })
  })
  test('status:404, responds with error for category query that does not exist', () => {
    return request(app)
      .get('/api/reviews?category=notacategory')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('category not found')
      })
  })
})
describe('GET /api/reviews/:review_id/comments', () => {
  test('status:200, responds with an array of comments for the given `review_id`', () => {
    return request(app)
      .get('/api/reviews/3/comments')
      .expect(200)
      .then(({ body }) => {
        const { comments } = body
        expect(comments).toBeInstanceOf(Array)
        expect(comments).toHaveLength(3)
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            }),
          )
        })
      })
  })
  test('status:200, responds with an empty array for a valid `review_id` which has no comments', () => {
    return request(app)
      .get(`/api/reviews/1/comments`)
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([])
      })
  })
  test('status:404, responds with error message if non-existing `review_id` is entered', () => {
    return request(app)
      .get(`/api/reviews/300000/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('review not found')
      })
  })
  test('status:400, responds with error message for invalid `review_id`', () => {
    return request(app)
      .get(`/api/reviews/notAnId/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid input')
      })
  })
})
describe('POST /api/reviews/:review_id/comments', () => {
  test('status:201, adds new comment to the database and responds with that comment', () => {
    const newComment = {
      username: 'dav3rid',
      body: 'This is a spooky game'
    }
    return request(app)
      .post(`/api/reviews/8/comments`)
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toEqual({
          comment_id: 7,
          body: 'This is a spooky game',
          votes: 0,
          author: 'dav3rid',
          review_id: 8,
          created_at: expect.any(String),
        })
      })
  })
  test('status:400, responds with error when author is missing from input', () => {
    const badComment = { username: null, body: 'This is a bad comment' }
    return request(app)
      .post(`/api/reviews/8/comments`)
      .send(badComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('input missing')
      })
  })
  test('status:404, responds with error when author does not exist in users database', () => {
    const badComment = { username: 'notauser', body: 'also a bad comment' }
    return request(app)
      .post(`/api/reviews/8/comments`)
      .send(badComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('does not exist')
      })
  })
  test('status:404, responds with error if non-existing `review_id` is entered', () => {
    return request(app)
      .get(`/api/reviews/300000/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('review not found')
      })
  })
  test('status:400, responds with error for invalid `review_id`', () => {
    return request(app)
      .get(`/api/reviews/notAnId/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid input')
      })
  })
})
describe('GET /api/comments/:comment_id', () => {
  test('status:200, responds with a single matching comment', () => {
    return request(app)
      .get(`/api/comments/1`)
      .expect(200)
      .then(({ body }) => {
        expect(body.comment).toEqual({
          comment_id: expect.any(Number),
          body: expect.any(String),
          votes: expect.any(Number),
          author: expect.any(String),
          review_id: expect.any(Number),
          created_at: expect.any(String)
        })
      })
  })
  test('status:404, responds with error if non-existing `comment_id` is entered', () => {
    return request(app)
      .get(`/api/comments/00000`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('comment not found')
      })
  })
  test('status:400, responds with error for invalid `comment_id`', () => {
    return request(app)
      .get(`/api/comments/notAnId`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid input')
      })
  })
})
describe('DELETE /api/comments/:comment_id', () => {
  test('status:204, removes specified comment and responds with an empty object', () => {
    return request(app)
    .delete(`/api/comments/3`)
    .expect(204)
    .then(({body}) => {
      expect(body).toEqual({})
    })
  })
  test('status:404, error when non-existing `comment_id` is entered', () => {
    return request(app)
    .get(`/api/comments/39853`)
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('comment not found')
    })
  })
  test('status:400, responds with error for invalid `comment_id`', () => {
    return request(app)
      .get(`/api/comments/notAnId`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid input')
      })
  })
})
describe('GET /api', () => {
  test('status:200, responds with an object describing available endpoints on the API', () => {
    return request(app)
    .get('/api')
    .expect(200)
    .then(({body}) => {
      expect(body.endpoints).toEqual(endpoints)
    })
  })
})
describe('GET /api/users', () => {
  test('status:200, responds with an array of users', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        const { users } = body
        expect(users).toBeInstanceOf(Array)
        expect(users).toHaveLength(4)
        users.forEach((user) =>
          expect(user).toEqual({
            username: expect.any(String)
          })
        )
      })
  })
})
describe('GET /api/users/:username', () => {
  test('status:200, responds with a single matching user, which has `username`, `avatar_url` and `name` properties', () => {
    return request(app)
      .get(`/api/users/dav3rid`)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toEqual({
          username: expect.any(String),
          avatar_url: expect.any(String),
          name: expect.any(String)
        })
      })
  })
  test('status:404, responds with error if non-existing `username` is entered', () => {
    return request(app)
      .get(`/api/users/notAUser`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('user not found')
      })
  })
})