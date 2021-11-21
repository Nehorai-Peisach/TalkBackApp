import './usersContainer.css';
const UsersContainer = ({ userClicked, users ,currentUser, connection }) => {


    return <div className='user-list'>
        <h4>Welcome {currentUser.username}!</h4>
        <hr className='line'/>
        <h5>Online</h5>
        { users.map((u,index) =><div>
            {u.username!==currentUser.username
                && u.connectionId
                    && <div className='user'>
                        <div className='circle-on'/>
                        <div className='online-user' key={'on'+index} onClick={()=> userClicked(u)}>{u.username}</div>
                    </div>
            } </div>
        )}
        <hr className='line'/>
        <h5>Offline</h5>
        { users.map((u,index) =><div>
            {u.username!==currentUser.username
                && !u.connectionId
                    && <div className='user'>
                        <div className='circle-off'/>
                        <div className='offline-user' key={'off'+index}>{u.username}</div>
                    </div>
            } </div>
        )}
    </div>
}

export default UsersContainer;