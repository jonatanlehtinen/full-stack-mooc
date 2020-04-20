import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('renders initially limited content', () => {
  const createBlog = jest.fn()

  const component = render(<NewBlogForm createBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('#form')

  fireEvent.change(titleInput, {
    target: { value: 'Test title' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Test author' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.test.com' },
  })
  fireEvent.submit(form)

  console.log(createBlog.mock.calls[0])
  expect(createBlog.mock.calls[0][0].title).toBe('Test title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
})
