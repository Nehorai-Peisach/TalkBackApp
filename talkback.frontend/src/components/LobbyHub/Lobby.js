import './Lobby.css'
import Chat from "./ChatForm/Chat";
import ConnectedUsers from "./ConnectedUsers";
import { useState, useEffect } from "react";

const Lobby = ({ chat, connection, currentUser, users }) => {

    const sendMessage = async (message) => {
        await connection.invoke("SendMessage", chat, message);
    }

    async function userClicked (otherUser){
        await connection.invoke("GetChat", currentUser.username, otherUser.username);
    };

    return <div>
        <ConnectedUsers userClicked={userClicked} users={users} currentUser={currentUser} connection={connection}/>
        {chat
            ? <Chat sendMessage={sendMessage} chat={chat} connection={connection}/>
            : <h4>Here is Chat!</h4>
        }
    </div>
}
export default Lobby;