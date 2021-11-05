import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/MainHub/Main';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './components/ChatHub/Chat';

const App = () =>{

  // const [messages, setMessages] = useState([]);
  // const [users, setUsers] = useState([]);

  // const loginUser = async (username,password)=>{
  //   try{
  //     const connection = new  HubConnectionBuilder()
  //     .withUrl("https://localhost:44322/chat")
  //     .configureLogging(LogLevel.Information)
  //     .build();

  //     connection.on("UsersInRoom", (users) => {
  //       setUsers(users);
  //     });

  //     connection.on("ReceiveMessage", (username,message) => {
  //       setMessages(messages => [...messages, {username, message}])
  //     });

  //     connection.onclose(e => {
  //       setConnection();
  //       setMessages([]);
  //       setUsers([]);
  //     })

  //     await connection.start();
  //     await connection.invoke("LoginUser", {username, password});
  //     setConnection(connection);

  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  
  // const sendMessage = async (message) => {
    //   try {
      //     await connection.invoke("SendMessage", message);
      //   } catch (e) {
        //     console.log(e)
        //   }
        // }
        
  const [logged, setLogged] = useState();
  const [connection, setConnection] = useState(
    new  HubConnectionBuilder()
    .withUrl(`https://localhost:44322/main`)
    .configureLogging(LogLevel.Information)
    .build());
    
    const connect =( hub ) => {
      try{
        const tempConnection = new  HubConnectionBuilder()
        .withUrl(`https://localhost:44322/${hub}`)
        .configureLogging(LogLevel.Information)
        .build();
        setConnection(tempConnection);
      } catch(e) {
        console.log(e);
      }
    }

    const loggedIn = ({flag}) => {
      setLogged(flag)
      console.log(flag);
    }

    const closeConnection = async () =>{
      try {
        await connection.stop();
      } catch (e) {
        console.log(e);
      }
    }
    
    return <div className='app'>
    <h2>TalkBack</h2>
    <hr className='line'/>
    {!logged
      ? <Main loggedIn={loggedIn} connect={connect} connection ={connection} closeConnection={closeConnection}/>
      : <h1>Connected</h1>
    }
    </div>
}

export default App;

      // <Chat messages={messages} sendMessage={sendMessage}
      //   closeConnection={closeConnection} users ={users}/>}