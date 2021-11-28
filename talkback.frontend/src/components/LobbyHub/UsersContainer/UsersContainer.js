import './usersContainer.css';
const UsersContainer = ({ userClicked, users ,currentUser }) => {


    return <div className='user-list'>
        <h4>Welcome {currentUser.username}!</h4>
        <hr className='line'/>
        <h5>Online</h5>
        <div className='user'>
            <div id={'CallChat'} className='circle on'/>
            <div className='online-user' id='allChat' onClick={()=> userClicked('allChat')}>All</div>
        </div>
        { users.map((u,index) =><div>
            {u.username!==currentUser.username
                && u.connectionId
                    && <div className='user'>
                        <div id={'C'+u.username} className='circle on'/>
                        <div className='online-user' id={u.username} onClick={()=> userClicked(u)}>{u.username}</div>
                    </div>
            } </div>
        )}
        <hr className='line'/>
        <h5>Offline</h5>
        { users.map((u,index) =><div>
            {u.username!==currentUser.username
                && !u.connectionId
                    && <div className='user'>
                        <div className='circle off'/>
                        <div className='offline-user' id={u.username}>{u.username}</div>
                    </div>
            } </div>
        )}
    </div>
}

export default UsersContainer;