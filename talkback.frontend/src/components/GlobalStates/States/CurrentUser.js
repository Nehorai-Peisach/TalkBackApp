export const setCurrentUser = name => {
    return {
        type: 'SET_USER',
        currentUser: name
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