import Chat from "./ChatHub/Chat";
import ConnectedUsers from "./ChatHub/ConnectedUsers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../GlobalStates/States/UserList";
import { connectChat } from "../GlobalStates/States/ConnectionChat";
const Lobby = () => {

    dispatch(connectChat('chat'))
    const dispatch = useDispatch();
    const connection = useSelector(state => state.connection);

    useEffect(() => {
    }, []);


    return <div>
        {/* <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users}></Chat> */}
        <ConnectedUsers/>
    </div>
}
export default Lobby;