import './Style.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Slider from './Slider';
import { useRef,useState,HubConnectionBuilder,LogLevel } from 'react';

const Main = (connection)=>{

  const container = useRef();
  const signInButton = useRef();
  const signUpButton = useRef();
  const signInClick= () => signInButton.current.click(container.current.classList.remove("right-panel-active"));
  const signUpClick= () => signUpButton.current.click(container.current.classList.add("right-panel-active"));

  const [mainConnection, setMainConnection] = useState();

  const loginUser = async (username,password)=>{
    try{
      const tempConnection = new  HubConnectionBuilder()
      .withUrl("https://localhost:44322/main")
      .configureLogging(LogLevel.Information)
      .build();

      tempConnection.onclose(e => {
        setMainConnection();
      })


        function login(flag){
          console.log('LoginFunc Step');
          flag ? setMainConnection(tempConnection)
          : console.log('User not found!');
        }

      tempConnection.on("IsLogin", (flag) =>{
        console.log('IsLogin Step');
        login(flag)
      })

      await tempConnection.start();
      await tempConnection.invoke("LoginUser", {username, password});
      connection = mainConnection;
    } catch(e) {
      console.log(e);
    }
  }

    

    return <div className='container' ref={container}>
        <SignIn loginUser={loginUser}></SignIn>
        <SignUp></SignUp>
        <Slider signInButton={signInButton} signUpButton={signUpButton} signUpClick={signUpClick} signInClick={signInClick}></Slider>
    </div>
}

export default Main;