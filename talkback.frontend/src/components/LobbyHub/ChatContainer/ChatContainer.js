import './chatContainer.css';
import MessagesContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";


const ChatContainer =({ currentUser, chat, sendMessage, }) => 
    <div className='chatContainer'>
    <MessagesContainer currentUser={currentUser} messages={chat.messages}/>
    <SendMessageForm sendMessage={sendMessage}/>
    </div>

    export default ChatContainer;