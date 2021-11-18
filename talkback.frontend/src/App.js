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

  useEffect(() => {
    Connect(setConnection, setCurrentUser, setUsers, setChat);
  }, [])

return <div className='app'>
  <h2>TalkBack</h2>
  <hr className='line'/>
  { !(currentUser && users)
      ? <Login connection={connection}/>
      : <Lobby chat={chat} connection={connection} currentUser={currentUser} users={users}/>
  }
  </div>
}
export default App;