import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

export const connectMain = () => {
    return {
        type: 'CONNECT',
        connection: null,
        currentUser: null,
        users: [],
        isConnected: false
    }
}
export const disconnectMain = () => {
    return {
        type: 'DISCONNECT',
    }
}

export const mainConnectionReducer = async (currentConnection = connectMain(), action) => {
    switch (action.type) {
        case 'CONNECT':
            let temp = await currentConnection;
            if(temp.isConnected)
                return currentConnection;

            let connection = new HubConnectionBuilder()
            .withUrl('https://localhost:44322/main')
            .configureLogging(LogLevel.Information)
            .build();
            
            connection.on("IsLogined", (user) =>{
                    !user 
                        ? console.log('Cant find user!')
                        : action.currentUser = user;
            });
            
            connection.on("IsRegistered", (flag) =>{
                flag
                    ? console.log(`Registered!`)
                    : console.log(`alredy in Database`);
            });

            connection.on("GetUsers", (users) =>{
                !users
                    ? console.log('Cant find users!')
                    : action.users = users;
            });
            
            action.connection = connection;
            
            console.log('connecting complte!')
            action.isConnected = true;
            action.connection.start();
            return action;
            
        case 'DISCONNECT':
            let temp2 = await currentConnection;
            if(!temp2.connection) {
                console.log('Connection is not open!');
            }
            else
            await temp2.connection.stop();
            
            return currentConnection;
            
            default:
                return currentConnection;

    }        
                    
}
