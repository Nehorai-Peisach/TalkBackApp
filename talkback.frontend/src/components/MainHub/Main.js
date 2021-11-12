import './Style.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Slider from './Slider';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { connectLogin} from "../GlobalStates/States/ConnectionLogin"

const Main = ()=>{

  const dispatch = useDispatch()
  const container = useRef();
  const signInButton = useRef();
  const signUpButton = useRef();
  const signUp = useRef();
  const signInClick= () => signInButton.current.click(container.current.classList.remove("right-panel-active"));
  const signUpClick= () => signUpButton.current.click(container.current.classList.add("right-panel-active"));

  const connection = useSelector(state => state.connectionLogin)

  const initialize = async () => {
    await dispatch(connectLogin());
    console.log(connection);
  }

  useEffect(() => {
    initialize();
  }, [])
  
return <div className='container' ref={container}>
    <SignIn/>
    <SignUp signUp={signUp} signUpClick={signInClick}></SignUp>
    <Slider signInButton={signInButton} signUpButton={signUpButton} signUpClick={signUpClick} signInClick={signInClick}></Slider>
  </div>
}

export default Main;