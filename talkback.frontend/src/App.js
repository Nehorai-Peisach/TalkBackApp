import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import Connect from './components/Connect'
import Login from './components/LoginHub/Login';
import Lobby from './components/LobbyHub/Lobby'
import CreatBoard, { MakeBoard } from './components/LobbyHub/GameContainer/GameBoard/Board';
import UpdateGame from './components/LobbyHub/GameContainer/UpdateGame';

const App = () =>{

  const [connection, setConnection] = useState();

  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useState();
  const [chat, setChat] = useState();

  const [dices, setDices] = useState();
  const midRef = useRef();
  const [board, setBoard] = useState();
  const [move, setMove] = useState();

  useEffect(async() => {
    await Connect(setMove, setDices, setConnection, setCurrentUser, setUsers, setChat);
    await MakeBoard();
    await setBoard(CreatBoard(midRef));
  }, [])

  useEffect(() => {
    if(move) {
      UpdateGame(move, midRef);
      setBoard(null);
      setBoard(CreatBoard(midRef));
    }
  }, [move])

  return <div id='app'>
    <div className='app'>
      <h2>TalkBack</h2>
      <hr className='line'/>
      { !(currentUser && users)
          ? <div className='game-grid'><Login  connection={connection}/></div>
          : <Lobby board={board} chat={chat} connection={connection} currentUser={currentUser} users={users}/>
      }
      </div>
  </div>
}
export default App;