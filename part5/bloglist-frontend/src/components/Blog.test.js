import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe ('</Blog />', () => {
	const blog = {
		title: 'renders title and author',
		author: 'Duarte Almeida',
		url: 'http://abc.com',
		likes: 20
	}

	test('blog renders title and author only', () => {
		const component = render(
			<Blog blog={blog}  />)

		const div = component.container.querySelector('.remainingDivs')

		expect(component.container).toHaveTextContent('renders title and author')
		expect(component.container).toHaveTextContent('Duarte Almeida')
		expect(div).toHaveStyle('display: none')
	})

	test('url and likes are shown when button is clicked', () => {
		const component = render(
			<Blog blog={blog} />
		)

		const btn = component.getByText('view')
		fireEvent.click(btn)

		expect(component.container).toHaveTextContent('http://abc.com')
		expect(component.container).toHaveTextContent('likes')
	})
})