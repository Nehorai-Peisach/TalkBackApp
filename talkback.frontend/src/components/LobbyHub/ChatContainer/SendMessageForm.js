import './sendMessage.css';
import { useState, useEffect} from "react"
import useSound from 'use-sound';
import send from '../../../assets/sounds/send.mp3';
const SendMessageForm = ({ currentUser, board, connection, chat }) => {

    const [message,setMessage] = useState();
    const [classname, setClassname] = useState('bigBar');
    let [play] = useSound(send);
    useEffect(() => {
        if(board) setClassname('smallBar');
        else setClassname('bigBar');
    }, [board])
    const sendGame = async () => {
        await connection.invoke("WantToPlayWith", chat);
        await connection.invoke('RollDice', chat);
    }
    
    const sendMessage = async () => {
        await connection.invoke("SendMessage", currentUser.username, chat, message, true );
        setMessage('');
        play();
    }
    return <form className='bar' onSubmit={ e => {
        e.preventDefault();
        sendMessage(message);
    }}>
        <input className={'message-input '+classname} placeholder='message...'
        onChange={e => setMessage(e.target.value)} value={message}/>
            {chat.users[1] === 'allChat'
                ? null
                : !board
                ? <button className='btn' type='button' onClick={() => sendGame()}>◘</button>
                : null
            }
            <button className='btn send' type='submit' disabled={!message}>»</button>
    </form>
}

export default SendMessageForm;