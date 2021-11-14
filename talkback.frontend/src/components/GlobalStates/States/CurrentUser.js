export const setCurrentUser = (user) => {
    return {
        type: 'SET_USER',
        currentUser: user
    }
}

export const currentUserReducer = (currentName = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.currentUser;
        default:
            return currentName;
    }
}