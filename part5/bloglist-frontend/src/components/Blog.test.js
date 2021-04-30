import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import {prettyDOM} from '@testing-library/dom'

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
})