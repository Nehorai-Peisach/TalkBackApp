import { useState } from "react"
import { Form } from "react-bootstrap"

const SignUp = ({ connect, connection, closeConnection }) => {
    
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [repassword,setRepassword] = useState();

    const registerUser = async ()=>{
        try{
            await connect('main')
            connection.on("IsRegister", (flag) =>{
            flag ? console.log(`Registered <${username}:${password}>!`)
                : console.log(`${username} alredy in Db`);
          })
          await connection.start();
          await connection.invoke("RegisterUser", {username, password});
        } catch(e) {
          console.log(e);
        }
    }

    return <Form className='form-container sign-up-container'
        onSubmit={e => {
            e.preventDefault();
            registerUser(username, password);
            closeConnection();
        }}>
        <h1>Create Account</h1>
        <Form.Group>
            <Form.Control type='text' placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            <Form.Control type='password' placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
            <Form.Control type='password' placeholder="Repeat Password" onChange={e=> setRepassword(e.target.value)}/>
        </Form.Group>
        <button variant='success' type='submit' disabled={!username || !password || !repassword || password !== repassword}>Sign Up</button>
    </Form>
}
export default SignUp;