import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Connect = (setMove, setDices, setConnection, setCurrentUser, setUsers, setChat) => {
    let connection = new HubConnectionBuilder()
    .withUrl('https://localhost:44322/main')
    .configureLogging(LogLevel.Information)
    .build();
    
    connection.on("UpdateBoard", (move) =>{
        setMove(move);
    });

    connection.on("Dice", (dice1, dice2) =>{
        setDices(dice1,dice2);
    });

    connection.on("IsLogined", (user) =>{
        !user 
            ? console.log('Cant find user!')
            : setCurrentUser(user);
    });
    
    connection.on("IsRegistered", (flag) =>{
        flag
            ? console.log(`Registered!`)
            : console.log(`alredy in Database`);
    });

    connection.on("GetUsers", (users) =>{
        !users
            ? console.log('Cant find users!')
            : setUsers(users);
    });

    connection.on("GetChat", (chat) =>{
        !chat
            ? console.log('Cant find chat!')
            : setChat(chat);
    });

    connection.on("SendMessage", (flag) =>{
        !flag
            ? console.log('Cant send message!')
            : console.log('Message sent!');
    });

    connection.start();
    setConnection(connection);
    console.log('connecting complte!');
}

export default Connect;