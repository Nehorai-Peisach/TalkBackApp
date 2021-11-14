import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/MainHub/Main';
import Lobby from './components/Lobby/Lobby'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { connectLogin } from './components/GlobalStates/States/ConnectionLogin';

const App = () =>{
  const currentUser = useSelector(state => state.connectionLogin.currentUser);
  const dispatch = useDispatch();

  const initialize = async () => {
    console.log('inside initialize');
    await dispatch(connectLogin());
    console.log(connectLogin());
  }

  useEffect(() => {
    initialize();
  }, []);
  

    return <div className='app'>
    <h2>TalkBack</h2>
    <hr className='line'/>
    {!currentUser
      ? <Main/>
      : <Lobby/>
    }
    </div>
}
export default App;