import { useState } from "react"
import { Form } from "react-bootstrap"

const SignIn = ({ loginUser }) => {

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();

    return <Form className='form-container sign-in-container'
        onSubmit={e => {
            e.preventDefault();
            loginUser(username, password);
        }}>
        <h1>Sign in</h1>
        <Form.Group>
            <Form.Control type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
            <Form.Control type='password' placeholder='Password' onChange={e=> setPassword(e.target.value)}/>
        </Form.Group>
        <button type='submit' disabled={!username || !password}>Sign In</button>
    </Form>
}
export default SignIn;