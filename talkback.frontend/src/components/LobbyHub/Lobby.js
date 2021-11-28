import './Lobby.css'
import UsersContainer from "./UsersContainer/UsersContainer";
import GameLogic from './GameContainer/GameLogic';
import ChatContainer from './ChatContainer/ChatContainer';
import { useState } from 'react';

const Lobby = ({ move, turn, color, setDices, dices, board, chat, connection, currentUser, users }) => {

    const [flag, setFlag] = useState(true);
    async function userClicked (otherUser){
        await connection.invoke("EndGame", chat, null);

        if(otherUser === 'allChat') await connection.invoke("GetChat", '', otherUser);
        else await connection.invoke("GetChat", currentUser.username, otherUser.username);
    };


    return <div>
        { !board && <button onClick={() => setFlag(!flag)}>Help</button>}
        {
            flag
            ?<div className='lobby'>
                <UsersContainer userClicked={userClicked} users={users} currentUser={currentUser} connection={connection}/>
                {chat
                    ?<div className='game'>
                        <GameLogic move={move} currentUser={currentUser} turn={turn} color={color} setDices={setDices} dices={dices} board ={board} connection={connection} chat={chat}></GameLogic>
                        <ChatContainer board={board} connection={connection} currentUser={currentUser} chat={chat}></ChatContainer>
                    </div> 
                    : <h4 className='lobby-wating'>Select a friend to chat with</h4>
                }
            </div>
            :<div className='lobby space'>
                <h3>History of Backgammon (in short)</h3>
                <h5>
                Backgammon is a tables game (we made it an online game :D) and one of a family of games whose history can be traced back nearly 5,000 years to archaeological discoveries in Jiroft, modern-day Iran. Its immediate ancestor was the 16th-century game of Irish, the Anglo-Scottish equivalent of the French Toutes Tables and Spanish Todas Tablas, the latter being recorded by Alfonso X in his 1283 work, El Libro de los Juegos.
                Backgammon is a two-player game where each player has fifteen pieces (checkers or men) that move between twenty-four triangles (points) according to the roll of two dice. The objective of the game is to be first to bear off, i.e. move all fifteen checkers off the board.
                Backgammon involves a combination of strategy and luck (from rolling dice). While the dice may determine the outcome of a single game, the better player will accumulate the better record over a series of many games. With each roll of the dice, players must choose from numerous options for moving their checkers and anticipate possible counter-moves by the opponent. The optional use of a doubling cube allows players to raise the stakes during the game.
                Like chess, backgammon has been studied with great interest by computer scientists. Owing to this research, backgammon software such as TD-Gammon has been developed that is capable of beating world-class human players.
                </h5>
                <a href='https://www.backgammononlineguide.com/rules.html' target='_blank'>Here you can read all about the rules of Backgammon online!</a>
                <hr/>
                <div className='showUsers'><div className='circle on'/>Online User.</div>
                <div className='showUsers'><div className='circle off'/>Offline User.</div>
                <div className='showUsers'><div className='circle play'/>User that what to play with you.</div>
            </div>
        }

    </div>
}

export default Lobby;