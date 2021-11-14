import Chat from "./ChatHub/Chat";
import ConnectedUsers from "./ChatHub/ConnectedUsers";

const Lobby = () => {

    return <div>
        HELLO
        {/* <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users}></Chat> */}
        <ConnectedUsers/>
    </div>
}
export default Lobby;