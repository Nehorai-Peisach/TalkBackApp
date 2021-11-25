import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import Connect from './components/Connect'
import Login from './components/LoginHub/Login';
import Lobby from './components/LobbyHub/Lobby'
import CreatBoard, { MakeBoard } from './components/LobbyHub/GameContainer/Board';
import UpdateGame from './components/LobbyHub/GameContainer/UpdateGame';

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

  useEffect(async() => {
    await Connect(setTurn, setBoard, setColor, setMove, setDices, setConnection, setCurrentUser, setUsers, setChat, dices);
    await MakeBoard();
  }, [])

  useEffect(() => {
    if(move && dices) {
      UpdateGame(color, turn,  move, dices, setDices, connection, chat);
    }
  }, [move])

  useEffect(() => {
    if(!turn || !color) return;
    if(turn == color){
        document.getElementById('myTurn').className = 'userInfo turn';
        document.getElementById('otherTurn').className = 'userInfo';
    }
    else{
        document.getElementById('myTurn').className = 'userInfo';
        document.getElementById('otherTurn').className = 'userInfo turn';
    }
}, [turn])

  return <div id='app'>
    <div className='app'>
      <h2>TalkBack</h2>
      <hr className='line'/>
      { !(currentUser && users)
          ? <div className='game-grid'><Login  connection={connection}/></div>
          : <Lobby turn={turn} color={color} setDices={setDices} dices={dices} board={board} chat={chat} connection={connection} currentUser={currentUser} users={users}/>
      }
      </div>
  </div>
}
export default App;