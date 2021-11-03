
const ConnectedUsers = ({users}) => <div className='user-list'>
    <h4>Connected Users</h4>
    {users.map((u,index) => <h6 key={index}>{u}</h6>)}
</div>

export default ConnectedUsers;