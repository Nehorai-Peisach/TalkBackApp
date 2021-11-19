import './Lobby.css'
import ChatContainer from './ChatContainer/ChatContainer'
import UsersContainer from "./UsersContainer/UsersContainer";
import GameContainer from    './GameContainer/GameContainer';

const Lobby = ({game, chat, connection, currentUser, users }) => {

    const sendMessage = async (message) => {
        await connection.invoke("SendMessage", chat, message);
    }

    async function userClicked (otherUser){
        await connection.invoke("GetChat", currentUser.username, otherUser.username);
    };

    return <div className='lobby'>
        <UsersContainer userClicked={userClicked} users={users} currentUser={currentUser} connection={connection}/>
        {chat
            ? !game
                ?   <div className='lobby'>
                        {/* <GameContainer></GameContainer> */}
                        <ChatContainer currentUser={currentUser} sendMessage={sendMessage} chat={chat} connection={connection}/>
                    </div>
                :   <ChatContainer currentUser={currentUser} sendMessage={sendMessage} chat={chat} connection={connection}/>
            : <h4 className='lobby-wating'>Select a freind to chat with</h4>
        }
    </div>
}
export default Lobby;