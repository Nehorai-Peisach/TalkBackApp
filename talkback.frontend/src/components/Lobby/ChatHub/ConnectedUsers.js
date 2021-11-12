import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserList } from "../../GlobalStates/States/UserList";

const ConnectedUsers = () => {

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser)
    const connection = useSelector(state => state.connection)

    const load = async() => {
        debugger
        await 
        connection.start();
        connection.invoke("LoadUsers", currentUser );
    }

    return <div className='user-list'>
        {load}
        <h4>Connected Users</h4>
        {users.map((u,index) => <h6 key={index}>{u}</h6>)}
    </div>
}

export default ConnectedUsers;