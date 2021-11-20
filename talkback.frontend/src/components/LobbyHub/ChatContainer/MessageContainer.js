import './messageContainer.css';
import { useEffect,useRef } from "react";

const MessagesContainer =({ currentUser, messages }) =>{
    const messageRef = useRef();

    useEffect(() => {
        if(messageRef && messageRef.current){
            const { scrollHeight,clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages])

    return <div ref={messageRef} className='message-container'>
        {messages.map((m, index) =>
            m.sender == currentUser.username
            ?   <div className='sender'>
                    <div className='message color-sender' key={index}>
                        <div className='message-text'>{m.text}</div>
                        <div className='message-date'>{m.date}</div>
                        <div className='message-name'>From: {m.sender}</div>
                    </div>
                </div>
            :   <div className='reciver'>
                    <div className='message color-reciver' key={index}>
                        <div className='message-text'>{m.text}</div>
                        <div className='message-date'>{m.date}</div>
                        <div className='message-name'>From: {m.sender}</div>
                    </div>
                </div>
        )}
    </div>
}

export default MessagesContainer;