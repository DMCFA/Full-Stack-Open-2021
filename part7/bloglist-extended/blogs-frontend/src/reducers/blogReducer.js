import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
	switch (action.type) {
	case 'GET_ALL_BLOGS':
		return action.data
	case 'NEW_BLOG':
		return [...state, action.data]
	case 'LIKE_BLOG':
		return state.map(blog =>
			blog.id !== action.data.id ? blog : action.data)
	case 'REMOVE_BLOG':
		return state.filter(blog =>
			blog.id !== action.data.id)
	case 'ADD_COMMENT':
		return state.map(comment =>
			comment.id !== action.data.id ? comment : action.data)
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

export const likeBlog = (blog) => {
	return async dispatch => {
		const blogObject = await blogService.update(blog)
		dispatch({
			type: 'LIKE_BLOG',
			data: blogObject
		})
	}
}

export const removeBlog = (id) => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch({
			type: 'REMOVE_BLOG',
			id
		})
	}
}

export const addComment = (comment, id) => {
	return async dispatch => {
		const blogObject = await blogService.comment(id, comment)
		dispatch({
			type: 'ADD_COMMENT',
			data: blogObject
		})
	}
}


export default blogReducer