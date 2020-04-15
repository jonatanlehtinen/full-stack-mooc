const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Test 2',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 52,
  },
  {
    title: 'Test 3',
    author: 'Testi author',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
  }
]

const getTokenForTestUser = async (api) => {
  const testUser = {
    username: "test",
    password: "test",
    name: "Test",
  }

  await api
  .post('/api/users')
  .send(testUser)

  let token = ""

  await api
    .post('/api/login')
    .send({username: "test", password: "test"})
    .expect(response => {
      console.log(response.body)
      token =  "Bearer " + response.body.token
    })
    
  return token
}

module.exports = {
  initialBlogs,
  getTokenForTestUser
}