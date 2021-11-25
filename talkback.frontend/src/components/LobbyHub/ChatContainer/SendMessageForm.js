import './sendMessage.css';
import { useState } from "react"

const SendMessageForm = ({ board, connection, chat }) => {

    const [message,setMessage] = useState();

    const sendGame = async () => {
        await connection.invoke("WantToPlayWith", chat);
        await connection.invoke('RollDice', chat);
    }

    const sendMessage = async () => {
        await connection.invoke("SendMessage", chat, message);
        setMessage('');
    }

    return <div className='bar'>
        <input className='message-input' placeholder='message...'
        onChange={e => setMessage(e.target.value)} value={message}/>
            {!board && <button className='btn' onClick={() => sendGame()}>◘</button>}
            <button className='btn send' onClick={() => sendMessage()} disabled={!message}>»</button>
    </div>
}

export default SendMessageForm;