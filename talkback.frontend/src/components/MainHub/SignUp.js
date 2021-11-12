import { useState } from "react"
import { Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"

const SignUp = ({ signUp, signUpClick }) => {
    
    const connection = useSelector(state => state.connection)
    
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [repassword,setRepassword] = useState();

    const registerUser = async ()=>{
        try{
          await connection.invoke("RegisterUser", {username, password});
        } catch(e) {
          console.log(e);
        }
    }

    return <Form className='form-container sign-up-container'
        onSubmit={e => {
            e.preventDefault();
            registerUser(username, password);
            signUpClick();
        }}>
        <h1>Create Account</h1>
        <Form.Group>
            <Form.Control type='text' placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            <Form.Control type='password' placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
            <Form.Control type='password' placeholder="Repeat Password" onChange={e=> setRepassword(e.target.value)}/>
        </Form.Group>
        <button ref={signUp} type='submit' disabled={!username || !password || !repassword || password !== repassword}>Sign Up</button>
    </Form>
}
export default SignUp;