import Chat from "./ChatForm/Chat";
import ConnectedUsers from "./ConnectedUsers";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connectMain } from "../GlobalStates/States/MainConnection";

const Lobby = () => {
    const [currentUser, setCurrentUser] = useState();
    const [users, setUsers] = useState();
    const global = useSelector(state => state.mainConnection);

    useEffect(async () => {
        global.then((res) => {
            setCurrentUser(res.currentUser);
            setUsers(res.users);
        })
    },[global])
    return <div>{ !users
        ? <h1>Loading...</h1>
        : <ConnectedUsers currentUser={currentUser} users={users}/>
        }
    </div>
}
export default Lobby;