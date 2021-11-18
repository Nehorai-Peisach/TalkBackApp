import './sendMessage.css';
import { useState } from "react"
import { FormControl, InputGroup, Button, Form, FormGroup } from "react-bootstrap"

const SendMessageForm = ({ sendMessage }) => {

    const [message,setMessage] = useState();

    const onClick = () => {
        sendMessage(message);
        setMessage('');
    } 
    return <div className='bar'>
                <input className='message-input' placeholder='message...'
                onChange={e => setMessage(e.target.value)} value={message}/>
                    <button className='btn' onClick={() => onClick()} disabled={!message}>»</button>
            </div>
}

export default SendMessageForm;