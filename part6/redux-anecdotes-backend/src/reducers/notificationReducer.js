const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.notification
        default:
            return state;
    }
}

export const addNotification = (notification) => {
    return {
        type: 'NOTIFICATION',
        notification
    }
} 

export default notificationReducer