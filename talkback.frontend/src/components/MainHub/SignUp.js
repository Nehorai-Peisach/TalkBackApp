import { useState, useCallback } from "react"
import { Form } from "react-bootstrap"
import { useSelector } from "react-redux"

const SignUp = ({ signUp, signUpClick }) => {
    
    const connection = useSelector(state => state.connectionLogin)
    
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [repassword,setRepassword] = useState();

    const registerUser = ()=>{
        console.log(`the connection is:${connection}`)
        connection.then((res) =>{
            console.log(res);
            console.log(`username: ${username}, password: ${password}`)
            res.connection.invoke("RegisterUser", {username, password});

        }).catch((err)=> {
            console.log(err);
        })
    }
    return <Form className='form-container sign-up-container'
        onSubmit={e => {
            e.preventDefault();
            registerUser();
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