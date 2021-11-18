import MessagesContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";


const Chat =({ currentUser, chat, sendMessage, }) => 
    <div className='chat'>
    <MessagesContainer currentUser={currentUser} messages={chat.messages}/>
    <SendMessageForm sendMessage={sendMessage}/>
    </div>

    export default Chat;