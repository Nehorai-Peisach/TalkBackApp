
const ConnectedUsers = ({ userClicked, users ,currentUser, connection }) => {

    return <div className='user-list'>
        <h4>Welcome {currentUser.username}!</h4>
        <h4>Online</h4>
        { users.map((u,index) =><div>
            {u.username!=currentUser.username
                ? u.connectionId
                    ? <button key={'on'+index} onClick={() => userClicked(u)}>{u.username}</button>
                    : null
                : null
            } </div>
        )}
        <h4>Offline</h4>
        { users.map((u,index) =><div>
            {u.username!=currentUser.username
                ? !u.connectionId
                    ? <h6 key={'off'+index}>{u.username}</h6>
                    : null
                : null
            } </div>
        )}
    </div>
}

export default ConnectedUsers;