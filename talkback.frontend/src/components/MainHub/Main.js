import './Style.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Slider from './Slider';
import { useRef } from 'react';

const Main = ({ loggedIn, connect, connection, closeConnection})=>{

  const container = useRef();
  const signInButton = useRef();
  const signUpButton = useRef();
  const signInClick= () => signInButton.current.click(container.current.classList.remove("right-panel-active"));
  const signUpClick= () => signUpButton.current.click(container.current.classList.add("right-panel-active"));

return <div className='container' ref={container}>
        <SignIn loggedIn={loggedIn} connect={connect} connection={connection} closeConnection={closeConnection}></SignIn>
        <SignUp connect={connect} connection={connection} closeConnection={closeConnection}></SignUp>
        <Slider signInButton={signInButton} signUpButton={signUpButton} signUpClick={signUpClick} signInClick={signInClick}></Slider>
    </div>
}

export default Main;