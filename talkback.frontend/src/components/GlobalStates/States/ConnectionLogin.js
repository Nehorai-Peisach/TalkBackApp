import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

export const connectLogin = () => {
    return {
        type: 'CONNECT_CHAT',
        currentUser: {}
    }
}
export const disconnectLogin = () => {
    return {
        type: 'DISCONNECT_CHAT',
    }
}

export const connectionLoginReducer = async (currentConnection = null, action) => {
    switch (action.type) {
        case 'CONNECT_CHAT':
            if(currentConnection) return currentConnection;

            let connection = new HubConnectionBuilder()
                .withUrl('https://localhost:44322/login')
                .configureLogging(LogLevel.Information)
                .build()

            await connection.on("IsLogined", (user) =>{
                if(user)
                    action.currentUser = user;
                else
                console.log('Cant find user!');
            })

            await connection.on("IsRegistered", (flag) =>{
                flag ? console.log(`Registered!`)
                    : console.log(`alredy in Database`);
              })
            
            await connection.start();
            return connection;

        case 'DISCONNECT_CHAT':
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