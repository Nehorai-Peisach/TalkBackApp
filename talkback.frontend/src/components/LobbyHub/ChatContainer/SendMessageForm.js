import './sendMessage.css';
import { useState, useEffect} from "react"

const SendMessageForm = ({ board, connection, chat }) => {

    const [message,setMessage] = useState();
    const [classname, setClassname] = useState('bigBar');
    useEffect(() => {
        if(board) setClassname('smallBar');
        else setClassname('bigBar');
    }, [board])
    const sendGame = async () => {
        await connection.invoke("WantToPlayWith", chat);
        await connection.invoke('RollDice', chat);
    }

    const sendMessage = async () => {
        await connection.invoke("SendMessage", chat, message);
        setMessage('');
    }

    
    return <form className='bar' onSubmit={ e => {
        e.preventDefault();
        sendMessage(message);
    }}>
        <input className={'message-input '+classname} placeholder='message...'
        onChange={e => setMessage(e.target.value)} value={message}/>
            {!board && <button className='btn' onClick={() => sendGame()}>◘</button>}
            <button className='btn send' type='submit' disabled={!message}>»</button>
    </form>
}

export default SendMessageForm;