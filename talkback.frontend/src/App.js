import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/LoginHub/LoginWindow';
import Lobby from './components/LobbyHub/Lobby'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { connectMain } from './components/GlobalStates/States/MainConnection';

const App = () =>{
  
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const global = useSelector(state => state.mainConnection);

  useEffect(async () => {
    global
    .then((res) => setCurrentUser(res.currentUser))
  },[global])
  
  useEffect(() => {
    dispatch(connectMain());
  },[]);

    return <div className='app'>
    <h2>TalkBack</h2>
    <hr className='line'/>
    { !currentUser
        ? <Login/>
        : <Lobby/>
    }
    </div>
}
export default App;