import './Lobby.css'
import UsersContainer from "./UsersContainer/UsersContainer";
import GameLogic from './GameContainer/GameLogic';
import ChatContainer from './ChatContainer/ChatContainer';

const Lobby = ({setBoard, setDices, dices, board, chat, connection, currentUser, users }) => {
    async function userClicked (otherUser){
        await connection.invoke("GetChat", currentUser.username, otherUser.username);
        await connection.invoke("EndGame", chat);
    };

    return <div className='lobby'>
        {/* <button onClick = {() => onClick()}>Game</button> */}
        <UsersContainer userClicked={userClicked} users={users} currentUser={currentUser} connection={connection}/>
        {chat
            ?<div className='game'>
                <GameLogic setDices={setDices} dices={dices} board ={board} connection={connection} chat={chat}></GameLogic>
                <ChatContainer connection={connection} currentUser={currentUser} chat={chat}></ChatContainer>
            </div> 
            : <h4 className='lobby-wating'>Select a friend to chat with</h4>
        }
    </div>
}
export default Lobby;