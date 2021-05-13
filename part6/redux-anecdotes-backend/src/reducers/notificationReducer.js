const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state;
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

let timer
export const addNotification = (notification, time) => {
    window.clearTimeout(timer)
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            notification
        });

        timer = setTimeout(() =>
            dispatch(removeNotification()),
            time * 500
        )
    }
} 

export default notificationReducer