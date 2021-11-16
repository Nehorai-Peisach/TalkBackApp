import './Style.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Slider from './Slider';
import { useRef } from 'react';

const Login = ()=>{

  const container = useRef();
  const signInButton = useRef();
  const signUpButton = useRef();
  const signUp = useRef();
  const signInClick= () => signInButton.current.click(container.current.classList.remove("right-panel-active"));
  const signUpClick= () => signUpButton.current.click(container.current.classList.add("right-panel-active"));
  

return <div className='container' ref={container}>
    <SignIn />
    <SignUp signUp={signUp} signUpClick={signInClick}></SignUp>
    <Slider signInButton={signInButton} signUpButton={signUpButton} signUpClick={signUpClick} signInClick={signInClick}></Slider>
  </div>
}

export default Login;