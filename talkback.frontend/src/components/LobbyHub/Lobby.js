import './Lobby.css'
import UsersContainer from "./UsersContainer/UsersContainer";
import GameBoard from './GameContainer/GameBoard/GameBoard';

const Lobby = ({board, chat, connection, currentUser, users }) => {

    const onClick = () => {
        const myBoard = <GameBoard connection={connection} chat={chat}/>
        connection.invoke('UpdateBoard', chat, myBoard);
    }

    const sendMessage = async (message) => {
        await connection.invoke("SendMessage", chat, message);
    }

    async function userClicked (otherUser){
        await connection.invoke("GetChat", currentUser.username, otherUser.username);
    };

    return <div className='lobby'>
        {/* <button onClick = {() => onClick()}>Game</button> */}
        <UsersContainer userClicked={userClicked} users={users} currentUser={currentUser} connection={connection}/>
        {chat
            ? <GameBoard board ={board} connection={connection} chat={chat}></GameBoard>
            : <h4 className='lobby-wating'>Select a friend to chat with</h4>
        }
    </div>
}
export default Lobby;