import MessagesContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";


const Chat =({ chat, sendMessage }) => 
    <div className='chat'>
    <MessagesContainer messages={chat.messages}/>
    <SendMessageForm sendMessage={sendMessage}/>
    </div>

    export default Chat;