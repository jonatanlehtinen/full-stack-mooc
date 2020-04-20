describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testuser',
      name: 'Test User',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('Login from is shown', function () {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Login')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      // const user = {
      //   username: 'testuser',
      //   password: 'password',
      // }
      // cy.request('POST', 'http://localhost:3001/api/login', user).then(
      //   ({ body }) => {
      //     localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      //     cy.visit('http://localhost:3000')
      //   }
      // )
    })

    it('A blog can be created, liked and removed', function () {
      cy.get('#show-blog-form-button').click()

      const newBlog = {
        title: 'This is a title',
        author: 'J.K. Rowling',
        url: 'www.test.com',
      }

      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)

      cy.get('#create-blog-button').click()

      cy.contains(newBlog.title)
      cy.contains(newBlog.author)

      cy.get('#view-blog').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()

      cy.contains('2')

      cy.get('#remove-blog').click()

      cy.contains(newBlog.title).should('not.exist')
      cy.contains(newBlog.author).should('not.exist')
    })

    it.only('A blog can be created, liked and removed', function () {
      const newBlog = {
        title: 'This is a title',
        author: 'J.K. Rowling',
        url: 'www.test.com',
      }

      cy.get('#show-blog-form-button').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-blog-button').click()

      cy.get('#show-blog-form-button').click()
      cy.get('#title').type('Completely new book')
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-blog-button').click()

      cy.get('#show-blog-form-button').click()
      cy.get('#title').type(newBlog.title + ' 2')
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-blog-button').click()

      cy.contains(newBlog.title).parent().find('#view-blog').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()

      cy.contains('Completely new book').parent().find('#view-blog').click()

      cy.contains('Completely new book')
        .parent()
        .find('#like-button')
        .as('likeButton')
      cy.get('@likeButton').click()
      cy.get('@likeButton').click()
      cy.get('@likeButton').click()

      cy.get('.blog-container').then((likes) => {
        expect(likes[0].innerText).to.equal(
          'Completely new book J.K. Rowlinghide'
        )
        expect(likes[1].innerText).to.equal(
          newBlog.title + ' ' + newBlog.author + 'hide'
        )
        expect(likes[2].innerText).to.equal(
          newBlog.title + ' 2 ' + newBlog.author + 'view'
        )
      })
    })
  })
})
