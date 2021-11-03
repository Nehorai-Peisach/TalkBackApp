import Style from './Style.css'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Slider from './Slider'
import { useRef,useState,HubConnectionBuilder,LogLevel } from 'react'

const Main = ({loginUser})=>{

  const container = useRef();

  const signInButton = useRef();
  const signUpButton = useRef();

  const signInClick= () => signInButton.current.click(container.current.classList.remove("right-panel-active"));
  const signUpClick= () => signUpButton.current.click(container.current.classList.add("right-panel-active"));

    

    return <div className='container' ref={container}>
        <SignIn loginUser={loginUser}></SignIn>
        <SignUp></SignUp>
        <Slider signInButton={signInButton} signUpButton={signUpButton} signUpClick={signUpClick} signInClick={signInClick}></Slider>
    </div>
}

export default Main;


/*
  const [connection, setConnection] = useState();
  const [users, setUsers] = useState([]);

  const loginUser = async (username,password)=>{
    try{
      const connection = new  HubConnectionBuilder()
      .withUrl("https://localhost:44322/main")
      .configureLogging(LogLevel.Information)
      .build();

      connection.onclose(e => {
        setConnection();
        setUsers([]);
      })

      connection.on("IsLogin", (flag) =>{
          flag
          ? setConnection(connection)
          : null
      })

      await connection.start();
      await connection.invoke("LoginUser", {username, password});

    } catch(e) {
      console.log(e);
    }
  }
*/