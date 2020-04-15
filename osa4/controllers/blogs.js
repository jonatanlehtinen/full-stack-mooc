const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.likes) {
    blog.likes = 0
  }

  if(!blog.title && !blog.url) {
    return response.status(400).end()
  }
    
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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