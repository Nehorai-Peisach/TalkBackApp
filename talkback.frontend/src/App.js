import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Connect from './components/Connect'
import Login from './components/LoginHub/Login';
import Lobby from './components/LobbyHub/Lobby'
import { MakeBoard } from './components/LobbyHub/GameContainer/Board';

const App = () =>{

  const [connection, setConnection] = useState();

  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useState();
  const [chat, setChat] = useState();

  const [dices, setDices] = useState([0,0,0,0]);
  const [board, setBoard] = useState();
  const [move, setMove] = useState();
  const [color, setColor] = useState();
  const [turn, setTurn] = useState();

  useEffect(() => {
    Connect(setTurn, setBoard, setColor, setMove, setDices, setConnection, setCurrentUser, setUsers, setChat);
    MakeBoard();
  }, []);

return <div id='app'>
    <div className='app'>
      <h2>TalkBack</h2>
      <hr className='line'/>
      { !(currentUser && users)
          ? <div className='game-grid'><Login  connection={connection}/></div>
          : <Lobby move={move} turn={turn} color={color} setDices={setDices} dices={dices} board={board} chat={chat} connection={connection} currentUser={currentUser} users={users}/>
      }
      </div>
  </div>
}
export default App;