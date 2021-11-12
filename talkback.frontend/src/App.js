import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/MainHub/Main';
import Lobby from './components/Lobby/Lobby'
import { useSelector } from 'react-redux';

const App = () =>{
  const currentUser = useSelector(state => state.currentUser)

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