import './messageContainer.css';
import { useEffect, useRef, useState } from "react";
import useSound from 'use-sound';
import recive from '../../../assets/sounds/recive.mp3';
const MessagesContainer =({ board, currentUser, messages }) =>{
    const messageRef = useRef();
    const [classname, setClassname] = useState('big');
    let [play] = useSound(recive);
    useEffect(() => {
        if(board) setClassname('small');
        else setClassname('big');
    }, [board])
    useEffect(() => {
        if(messageRef && messageRef.current){
            const { scrollHeight,clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
        if(messages[messages.length-1].sender !== currentUser.username) play();
    }, [messages])

    return <div ref={messageRef} className={'message-container '+classname}>
        {messages.map((m, index) =>
            m.sender === currentUser.username
            ?   <div className='sender'>
                    <div className='message color-sender' key={index}>
                        <div className='message-text'>{m.text}</div>
                        <div className='message-date'>{m.date}</div>
                    </div>
                </div>
            : m.sender === 'Server'
            ? <div className='server'>
            <div className='message color-server' key={index}>
                <div className='message-text'>{m.text}</div>
            </div>
        </div>
            :<div className='reciver'>
                    <div className='message color-reciver' key={index}>
                        <div className='message-name'>{m.sender}</div>
                        <div className='message-text'>{m.text}</div>
                        <div className='message-date'>{m.date}</div>
                    </div>
                </div>
        )}
    </div>
}

export default MessagesContainer;