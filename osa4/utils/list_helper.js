const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((prev, curr) => curr.likes + prev, 0) 
}

const favoriteBlog = blogs => {

  if(blogs.length === 0) {
    return {}
  }

  const greatest = blogs.reduce((prev, curr) => {
    return (prev.likes > curr.likes) ? prev : curr
  })

  return {
    title: greatest.title,
    author: greatest.author,
    likes: greatest.likes,
  }
}

const mostBlogs = blogs => {

  if (blogs.length === 0) {
    return {}
  } else if(blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }

  return _.chain(blogs).groupBy('author').reduce((prev, curr) => {
    return (prev.length > curr.length) ? { author: prev[0].author, blogs: prev.length } : { author: curr[0].author, blogs: curr.length }
  }).value()
}

const mostLikes = blogs => {

  if(blogs.length === 0) {
    return {}
  } else if(blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  }

  const most = _.chain(blogs).groupBy('author').reduce((prev, curr) => {
    const prevLikes = _.sumBy(prev, 'likes')
    const currLikes = _.sumBy(curr, 'likes')
    return prevLikes > currLikes ? {...prev, likes: prevLikes} : {...currLikes, likes: currLikes}
  }).value()

  return {
    author: most[0].author,
    likes: most.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

