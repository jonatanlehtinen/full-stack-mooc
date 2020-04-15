const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash')
const helper = require('./test_helpers')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

test('a request to create user without password is declined', async () => {
  const userWithNoPassword = {
    username: 'TestName',
    name: 'J.K. Rowling',
  }

  await api
    .post('/api/users')
    .send(userWithNoPassword)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      expect(response.body.error).toEqual('password is required')
    })

  const response = await api.get('/api/users')

  expect(response.body.length).toEqual(0)
})

test('a request to create user with too short password to be declined', async () => {
  const userWithShortPassword = {
    username: 'TestName',
    name: 'J.K. Rowling',
    password: 'as'
  }

  await api
    .post('/api/users')
    .send(userWithShortPassword)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      expect(response.body.error).toEqual('the min length for password is 3 characters')
    })

  const response = await api.get('/api/users')

  expect(response.body.length).toEqual(0)
})

test('a request to create user without username be declined', async () => {
  const userWithNoUsername = {
    name: 'J.K. Rowling',
    password: 'afsdfs'
  }

  await api
    .post('/api/users')
    .send(userWithNoUsername)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      expect(response.body.error).toEqual('User validation failed: username: Path `username` is required.')
    })

  const response = await api.get('/api/users')
  expect(response.body.length).toEqual(0)
})

test('a request to create user with too short username should be declined', async () => {
  const userWithShortUsername = {
    username: "te",
    name: 'J.K. Rowling',
    password: 'afsdfs234'
  }

  await api
    .post('/api/users')
    .send(userWithShortUsername)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      expect(response.body.error).toEqual('User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3).')
    })

  const response = await api.get('/api/users')
  expect(response.body.length).toEqual(0)
})


test('a request to create user with already existing username should be declined', async () => {
  const newUser = {
    username: "newuser",
    name: 'J.K. Rowling',
    password: 'afsdfs234'
  }

  const sameUser = {
    username: "newuser",
    name: 'Harry Potter',
    password: 'afsdf2312s234'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const firstResponse = await api.get('/api/users')
  expect(firstResponse.body.length).toEqual(1)

  await api
    .post('/api/users')
    .send(sameUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      expect(response.body.error).toEqual('User validation failed: username: Error, expected `username` to be unique. Value: `newuser`')
    })

  const secondResponse = await api.get('/api/users')
  expect(secondResponse.body.length).toEqual(1)

})

afterAll(() => {
  mongoose.connection.close()
})