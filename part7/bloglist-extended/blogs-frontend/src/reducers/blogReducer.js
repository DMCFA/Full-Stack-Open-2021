import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
	switch (action.type) {
	case 'GET_ALL_BLOGS':
		return action.data
	case 'NEW_BLOG':
		return [...state, action.data]
	default:
		return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'GET_ALL_BLOGS',
			data: blogs
		})
	}
}

export const newBlog = (blog) => {
	return async dispatch => {
		const blogObject = await blogService.create(blog)
		dispatch({
			type: 'NEW_BLOG',
			data: blogObject
		})
	}
}

export default blogReducer