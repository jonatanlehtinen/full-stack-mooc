const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  const emptyList = []

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '23423423423345345',
      title: 'Test 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 52,
      __v: 0
    },
    {
      _id: '342345345345345',
      title: 'Test 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(59)
  })
})

describe('favorite blog', () => {

  const listWithNoBlogs = []

  test('when list has no blogs equals empty object', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    expect(result).toEqual({})
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const correctOneBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  }

  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(correctOneBlog)
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '23423423423345345',
      title: 'Test 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 52,
      __v: 0
    },
    {
      _id: '342345345345345',
      title: 'Test 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    }
  ]

  const correctMultipleBlogs = {
    title: 'Test 2',
    author: 'Edsger W. Dijkstra',
    likes: 52,
  }

  test('of a bigger list returns the blog with greatest amount of likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(correctMultipleBlogs)
  })
})


describe('most blogs', () => {

  const listWithNoBlogs = []

  test('should return empty object when given no blogs', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    expect(result).toEqual({})
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
  ]

  const correctWithOneBlog = { author: 'Edsger W. Dijkstra', blogs: 1}

  test('should return the only object when given one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(correctWithOneBlog)
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '23423423423345345',
      title: 'Test 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 52,
      __v: 0
    },
    {
      _id: '342345345345345',
      title: 'Test 3',
      author: 'Testi author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    }
  ]

  const correctWithMultiple = {
    author: 'Edsger W. Dijkstra',
    blogs: 2
  }

  test('should return the author with max blogs when given multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual(correctWithMultiple)
  })
})



describe('most likes', () => {

  const listWithNoBlogs = []

  test('should return empty object when given no blogs', () => {
    const result = listHelper.mostLikes(listWithNoBlogs)
    expect(result).toEqual({})
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
  ]

  const correctWithOneBlog = { author: 'Edsger W. Dijkstra', likes: 5}

  test('should return the only object when given one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(correctWithOneBlog)
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '23423423423345345',
      title: 'Test 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 52,
      __v: 0
    },
    {
      _id: '342345345345345',
      title: 'Test 3',
      author: 'Testi author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    }
  ]

  const correctWithMultiple = {
    author: 'Edsger W. Dijkstra',
    likes: 57
  }

  test('should return the author with max likes when given multiple blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual(correctWithMultiple)
  })
})