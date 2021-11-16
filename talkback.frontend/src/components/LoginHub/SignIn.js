import { useState, useEffect} from "react"
import { Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { connectMain } from "../GlobalStates/States/MainConnection";

const SignIn = () => {
    
    const dispatch = useDispatch();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();

    const [connection, setConnection] = useState();
    const mainConnection = useSelector(state => state.mainConnection);
    useEffect(() => {
        mainConnection.then(
            (res) => setConnection(res.connection)
        );
    }, [mainConnection])
    

    const loginUser = async () =>{
        await connection.invoke("LoginUser", {username, password});
        await connection.invoke("LoadUsers", {username});
        dispatch(connectMain());
    }

    return <Form className='form-container sign-in-container'
        onSubmit={e => {
            e.preventDefault();
            loginUser();
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