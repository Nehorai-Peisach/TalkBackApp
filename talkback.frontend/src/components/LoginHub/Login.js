import './Style.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Slider from './Slider';
import { useRef } from 'react';

const Login = ( { connection } )=>{

  const container = useRef();
  const signInButton = useRef();
  const signUpButton = useRef();
  const signUp = useRef();
  const signInClick= () => signInButton.current.click(container.current.classList.remove("right-panel-active"));
  const signUpClick= () => signUpButton.current.click(container.current.classList.add("right-panel-active"));
  
  const loginUser = async (username, password) =>{
    await connection.invoke("LoginUser", {username, password});
    await connection.invoke("LoadUsers");
}

return <div className='container' ref={container}>
    <SignIn loginUser={loginUser}/>
    <SignUp connection={connection} signUp={signUp} signUpClick={signInClick}></SignUp>
    <Slider signInButton={signInButton} signUpButton={signUpButton} signUpClick={signUpClick} signInClick={signInClick}></Slider>
  </div>
}

export default Login;