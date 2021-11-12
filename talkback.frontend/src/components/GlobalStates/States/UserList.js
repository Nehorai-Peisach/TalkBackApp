export const setUserList = users => {
    return {
        type: 'USERS',
        userList: users
    }
}

export const userListReducer = (currentUsers = null, action) => {
    switch (action.type) {
        case 'USERS':
            return action.userList;
        default:
            return currentUsers;
    }
}