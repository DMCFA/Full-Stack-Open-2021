let timer

const initialState = {
	message: '',
	type: ''
}

const notificationReducer = (state=initialState, action) => {
	switch (action.type) {
	case 'ADD_MESSAGE':
		return action.data
	case 'REMOVE_MESSAGE':
		return initialState
	default:
		return state
	}
}


export const addNotification = (message, type) => {
	return async dispatch => {
		dispatch({
			type: 'ADD_MESSAGE',
			data: {
				message,
				type
			}
		})
		window.clearTimeout(timer)
		timer = setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}
}

const removeNotification = () => {
	return async dispatch => {
		dispatch({
			type: 'REMOVE_MESSAGE'
		})
	}
}

export default notificationReducer