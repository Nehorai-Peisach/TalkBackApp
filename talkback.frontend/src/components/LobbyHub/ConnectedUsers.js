
const ConnectedUsers = ({ currentUser, users}) => {
    return <div className='user-list'>
        <h4>Welcome {currentUser.username}!</h4>
        <h5>Online:</h5>
        {
            users.map((u,index) => 
            u.connectionId
            ? <h6 key={index}>{u.username}</h6>
            : null
            )
        }
        <h5>Offline:</h5>
        {
            users.map((u,index) => 
            !u.connectionId
            ? <h6 key={index}>{u.username}</h6>
            : null
            )
        }
    </div>
}

export default ConnectedUsers;