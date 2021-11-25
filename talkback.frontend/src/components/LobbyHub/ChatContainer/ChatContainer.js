import './chatContainer.css';
import MessagesContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";


const ChatContainer =({ board, connection, currentUser, chat }) =>
    <div className='chatContainer'>
        <MessagesContainer currentUser={currentUser} messages={chat.messages}/>
        <SendMessageForm board={board} connection={connection} chat={chat}/>
    </div>

    export default ChatContainer;