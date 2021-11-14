import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

export const connectLogin = () => {
    return {
        type: 'CONNECT_LOGIN',
        currentUser: null,
        connection: null
    }
}
export const disconnectLogin = () => {
    return {
        type: 'DISCONNECT_LOGIN',
    }
}

export const connectionLoginReducer = async (currentConnection = null, action) => {
    // console.log(`current connction:${currentConnection}`);
    switch (action.type) {
        case 'CONNECT_LOGIN':
            console.log('case connectchat')
            // if(currentConnection !== null && currentConnection !== 'undefined') {
                //     await currentConnection.then((res) => {
                    //         console.log(`result:${res}`);
                    //         res.start();
                    //     });
                    //     return currentConnection;
                    // }
                    let connection = new HubConnectionBuilder()
                    .withUrl('https://localhost:44322/login')
                    .configureLogging(LogLevel.Information)
                    .build();
                    
                    
                await connection.on("IsLogined", (user) =>{
                    debugger; 
                    if(user) 
                        action.currentUser = user;
                    else
                    console.log('Cant find user!');
                })
            
                await connection.on("IsRegistered", (flag) =>{
                    flag ? console.log(`Registered!`)
                    : console.log(`alredy in Database`);
                })           
            
            connection.start();
            console.log(`connection:${connection}`);
            action.connection = connection;

            return action;
            
        case 'DISCONNECT_LOGIN':
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
