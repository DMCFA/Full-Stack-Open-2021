import userService from '../services/users'

const usersReducer = (state = [], action) => {
	switch (action.type) {
	case 'GET_ALL_USERS':
		return action.content
	default:
		return state
	}
}

export const initializeUsers = () => {
	return async (dispatch) => {
		const initializeBlogs = await userService.getAll()
		dispatch({
			type: 'GET_ALL_USERS',
			content: initializeBlogs,
		})
	}
}

export default usersReducer