import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

export const connectGame = connectionString => {
    return {
        type: 'CONNECTCHAT',
        connection: connectionString
    }
}
export const disconnectGame = () => {
    return {
        type: 'DISCONNECTCHAT',
    }
}

export const connectionGameReducer = async (currentConnection = null, action) => {
    switch (action.type) {
        case 'CONNECTCHAT':
            if(currentConnection) return currentConnection;

            let connection = new HubConnectionBuilder()
                .withUrl('https://localhost:44322/game')
                .configureLogging(LogLevel.Information)
                .build()

            connection.on("IsLogined", (user) =>{
                if(user)
                    currentConnection = user;
                else
                console.log('Cant find user!');
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