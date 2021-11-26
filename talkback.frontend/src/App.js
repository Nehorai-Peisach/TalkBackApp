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

    if(checkIfCantMove()){
      document.getElementById('cantMoveBtn').disabled = false;
      document.getElementById('cantMoveBtn').className = '';
    }
    else document.getElementById('cantMoveBtn').className = 'cantMoveBtn';
    
}, [turn])

  const checkIfCantMove = () => {
    debugger
    if(!color || !turn) return false;
    if(color !== turn) return false;

    let mid = document.getElementById('MidPart').children;
    if(mid.length > 0){
      for (let i = 0; i < mid.length; i++) {
        if(mid[i].classList.contains(color)){
          if(color == 'black'){
            let place = document.getElementById('T'+dices[1]).children;
            if(!place[2]) return false;
            if(place[2].classList.contains(color)) return false;
            place = document.getElementById('T'+dices[3]).children;
            if(!place[2]) return false;
            if(place[2].classList.contains(color)) return false;
          }
          if(color == 'white'){
            let place = document.getElementById('T'+(25 - dices[1])).children;
            if(!place[2]) return false;
            if(place[2].classList.contains(color)) return false;
            place = document.getElementById('T'+(25 - dices[3])).children;
            if(!place[2]) return false;
            if(place[2].classList.contains(color)) return false;
          }
          return true;
        }        
      }
    }
    for (let i = 1; i <= 24; i++) {
      let triangle = document.getElementById('T'+i);
      if(!triangle.children[1]) continue;

      if(triangle.children[1].classList.contains(color)){
        if(chackNextMoveValid(i,1)) return false;
        if(chackNextMoveValid(i,3)) return false;
      }
      else continue;
    }
    return true;
  }

  const chackNextMoveValid = (placeNum, diceNum) => {
    let num = 0;
    if(color === 'white'){
      num = placeNum - dices[diceNum];
      if(num < 1) return true;
    }
    if(color === 'black'){
      num = placeNum + dices[diceNum];
      if(num > 24) return true;
    }
    let nextPlace = document.getElementById('T'+num);
    if(nextPlace){
      if(!nextPlace.children[2]) return true;
      if(nextPlace.children[2].classList.contains(color)) return true;
    }
    return false;
  }

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