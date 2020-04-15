const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash')
const helper = require('./test_helpers')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('Go To Statement Considered Harmful')
})

test('all blogs have an identifying field id', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.every(blog => {
    return _.has(blog, "id")
  })

  expect(contents).toEqual(true)
})

test('a valid blog can be added ', async () => {

  const token = await helper.getTokenForTestUser(api)

  const newBlog = {
    title: 'This is a title',
    author: 'J.K. Rowling',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('This is a title')
})

test('likes is set to 0 if no likes are given', async () => {

  const token = await helper.getTokenForTestUser(api)

  const blogWithNoLikes = {
    title: 'This is a title',
    author: 'J.K. Rowling',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(blogWithNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const newBlog = response.body.find(value => value.title === "This is a title")

  expect(newBlog.likes).toEqual(0)
})


test('post returns 400 if no title and url is given', async () => {
  
  const token = await helper.getTokenForTestUser(api)

  const blogWithNoTitleAndLikes = {
    author: 'J.K. Rowling',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(blogWithNoTitleAndLikes)
    .expect(400)
})

test('post returns 401 if no token is given', async () => {
  
  const newBlog = {
    title: 'This is a title',
    author: 'J.K. Rowling',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect(response => {
      expect(response.body.error).toEqual("invalid token")
    })
})

afterAll(() => {
  mongoose.connection.close()
})