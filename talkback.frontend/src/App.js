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

  const linkClick = (link) => {

  }

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
        <hr className='line'/>

      <div className='foter'>
        <div>
          <div className='name'>Nehorai Peisach</div>
          <div className='links'>
            <a className='github' href='https://github.com/Nehorai-Peisach' target='_blank'/>
            <a className='linkedin' href='https://www.linkedin.com/in/nehorai-peisach-0a1408205/' target='_blank'/>
          </div>
        </div>
        <div>
          <div className='name ofekName'>Ofek Mor</div>
          <div className='links ofek'>
            <a className='github' href='https://github.com/ofeking8' target='_blank'/>
            <a className='linkedin' href='https://www.linkedin.com/in/ofek-mor-457017212/' target='_blank'/>
          </div>
        </div>
      </div>
  </div>
}
export default App;