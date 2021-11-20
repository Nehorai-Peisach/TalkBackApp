import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/LoginHub/Login';
import Lobby from './components/LobbyHub/Lobby'
import { useEffect, useState } from 'react';
import Connect from './components/Connect'

const App = () =>{
const [connection, setConnection] = useState();
const [currentUser, setCurrentUser] = useState();
const [users, setUsers] = useState();
const [chat, setChat] = useState();
const [dices, setDices] = useState();

const getDices = async (dice1, dice2) => {
  await connection.invoke("RollDice",(dice1), (dice2));
}

useEffect(() => {
  Connect(setDices, setConnection, setCurrentUser, setUsers, setChat);
}, [])

return <div id='app'>
  <div className='app'>
    <h2>TalkBack</h2>
    <hr className='line'/>
    { !(currentUser && users)
        ? <div className='game-grid'><Login  connection={connection}/></div>
        : <Lobby chat={chat} connection={connection} currentUser={currentUser} users={users}/>
    }
    </div>
</div>
}
export default App;