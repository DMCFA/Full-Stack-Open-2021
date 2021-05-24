import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
	switch (action.type) {
	case 'SET_USER':
		return action.data
	case 'LOGOUT_USER':
		return null
	default:
		return state
	}
}

export const setUser = (user) => {
	return {
		type: 'SET_USER',
		data: user
	}
}

export const loginUser = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setUser())
			dispatch(addNotification(`Welcome ${user.username}`))
		} catch (error) {
			dispatch(addNotification(error))
		}
	}
}

export const logoutUser = () => {
	return {
		type: 'LOGOUT_USER'
	}
}

export default userReducer