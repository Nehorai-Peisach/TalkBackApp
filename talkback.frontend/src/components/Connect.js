import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import CreatBoard from "./LobbyHub/GameContainer/Board";

const Connect = (setTurn, setBoard, setColor, setMove, setDices, setConnection, setCurrentUser, setUsers, setChat) => {
    let connection = new HubConnectionBuilder()
    .withUrl('https://localhost:44322/main')
    .configureLogging(LogLevel.Information)
    .build();
    
    connection.on("EndGame", () =>{
        setBoard(null);
    });

    connection.on("Turn", (turn) =>{
        setTurn(turn);
    });
    connection.on("CanPlay", () =>{
        setBoard(CreatBoard());
    });
    
    connection.on("GetColor", (color) =>{
        setColor(color);
    });


    connection.on("UpdateBoard", (move) =>{
        setMove(move);
    });

    connection.on("GetDice", (dice1, dice2) =>{
        if(dice1 === dice2) setDices([4, dice1, 4, dice2]);
        else setDices([1, dice1, 1, dice2]);

        document.getElementById('firstDice').className = 'firstDice dice'+dice1;
        document.getElementById('secondDice').className = 'secondDice dice'+dice2;
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