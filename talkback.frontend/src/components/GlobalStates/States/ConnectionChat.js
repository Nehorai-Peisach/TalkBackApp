import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

export const connectChat = () => {
    return {
        type: 'CONNECTCHAT',
        userList: []
    }
}
export const disconnectChat = () => {
    return {
        type: 'DISCONNECTCHAT',
    }
}

export const connectionChatReducer = async (currentConnection = null, action) => {
    switch (action.type) {
        case 'CONNECTCHAT':
            if(currentConnection) return currentConnection;
            let connection = new HubConnectionBuilder()
                .withUrl('https://localhost:44322/chat')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("GetUsers", (users) =>{
                action.userList = users; 
            })
            
            await connection.start();
            return connection;

        case 'DISCONNECTCHAT':
            if(!currentConnection) {
                console.log('Connection is not open!');
                return null;
            }
            await currentConnection.stop();
            return null;

        default:
            return currentConnection;
        }
}