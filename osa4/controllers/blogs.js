const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    blog.user = user._id

    if(!blog.likes) {
      blog.likes = 0
    }

    if(!blog.title && !blog.url) {
      return response.status(400).end()
    }

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  }
  catch(exception) {
    next(exception)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)

    if(!blog) {
      return response.status(404).end()
    }

    if(blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch (exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {

  const updatedLikes = {
    likes: request.body.likes
  }

  try {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedLikes, { new: true })
  response.json(updatedBlog.toJSON())
  } catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter