import './GameLogic.css';
import { useState, useEffect } from 'react'

const GameLogic = ({ currentUser, turn, color, dices, board, connection, chat }) => {
    const [activePiece, setActivePiece] = useState();

    const Update = (currentPlace, nextPlace) => {
        connection.invoke('UpdateBoard', chat, activePiece.id, currentPlace.id, nextPlace.id);
    }

    const RollDice = () => {
        debugger
        connection.invoke('RollDice', chat);
        connection.invoke('NextTurn', chat ,color);
    }
    const onClick = (e) => {
        if(turn !== color) return;
        
        const element = e.target;
        console.log(element.id);
        if(activePiece && (element.classList.contains('none-selected') || element.id === 'pieceOut')){
            Update(activePiece.parentElement, element);
        }
        if(activePiece && activePiece !== element){
            activePiece.style.border = '';
            document.getElementById('pieceOut').className = 'none';
            setActivePiece(null);
        }
        if((element.className === color+' piece')){
            element.style.border = 'solid #ffff 2px'
            setActivePiece(element);
        }
    }



    useEffect(() => {
        resetColor();
        if(!activePiece) return;
        if(activePiece.parentElement.id === 'MidPart')
        {
            if(color === 'black'){
                if(dices[0] > 0)colorIt(dices[1], color);
                if(dices[2] > 0)colorIt(dices[3], color);
            }
            if(color === 'white'){
                if(dices[0] > 0)colorIt(25-dices[1], color);
                if(dices[2] > 0)colorIt(25-dices[3], color);
            }
            return;
        }

        const midPart = document.getElementById('MidPart');
        for (let i = 0; i < midPart.children.length; i++) {
            if(midPart.children[i].classList.contains(color))
                return;
        }

        const placeId = parseInt(activePiece.parentElement.id.match(/\d+/));
        if(color === 'black'){

            if(dices[0] > 0)colorIt(placeId+dices[1], placeId);
            if(dices[2] > 0)colorIt(placeId+dices[3], placeId);
        }
        if(color === 'white'){
            if(dices[0] > 0)colorIt(placeId-dices[1], placeId);
            if(dices[2] > 0)colorIt(placeId-dices[3], placeId);
        }
    }, [activePiece])


    const colorIt = (num, placeId) => {
        if(color === 'black' && num > 24){
            if(!checkValid(1, (25-placeId), placeId)) return;
            if(!checkValid(3, (25-placeId), placeId)) return;
            PieceOut('black', 1, 18);
            return;
        }
        if(color === 'white' && num < 1){
            if(!checkValid(1, placeId, placeId)) return;
            if(!checkValid(3, placeId, placeId)) return;
            PieceOut('white', 7, 24 );
            return;
        }

        const lst = document.getElementById('T'+num).children;
        let otherColor;
        let count = 0;
        if(lst){
            for (let i = lst.length-1; i > -1; i--) {
                if(lst[i].id.match('N')){
                    if(!otherColor || otherColor.includes(color) || count<2)
                        lst[i].className = 'piece none-selected';
                }
                else{
                    otherColor = lst[i].className;
                    count++;
                }
            }
        }
    }

    const resetColor = () => {
        let piece;
        for (let i = 0; i < 25; i++) {
            piece = document.getElementById('N'+i);
            if(piece) piece.className = 'piece none';
        }
    }

    const checkValid = (diceNum, placeNum, placeId ) => {
        if(dices[diceNum] > placeNum && dices[diceNum-1]>0){
            for (let i = 19; i < placeId; i++) {
                for (let j = 0; j < document.getElementById('T'+i).children.length; j++) {
                    if(document.getElementById('T'+i).children[j].classList.contains(color)) return false;
                    if(j>2) break;
                }
            }
        }
        return true;
    }

    const PieceOut = (colorToChek, from, to) => {
        if(color === colorToChek){
            for (let i = from; i <= to; i++) {
                let place = document.getElementById('T'+i);
                for (let j = 0; j < place.children.length; j++) {
                    if(place.children[j].classList.contains(color)) return;
                }
            }
            document.getElementById('pieceOut').className = 'pieceOut';
        }
    }

    return <div>{
        !board
            ?null
            :<div className='gameHub' onClick={e => onClick(e)}>
                <div>
                    <div className='users'>
                        <div className={'topPiece '+color}/>
                        <div id={'myTurn'} className='userInfo'>You</div>
                        <button id='cantMoveBtn' className='cantMoveBtn' onClick={() => RollDice()}>You Can't Move Roll Dice Now!</button>
                        <div id={'otherTurn'} className='userInfo'>{(chat.users[0]==currentUser.username)?chat.users[1]:chat.users[0]}</div>
                        <div className={'topPiece '+ (color == 'white'?'black':'white')}/>
                    </div>
                    {board}
                </div>
                <div className='pieceOutArea'>
                        <div id={'pieceOut'} className='none'/>
                </div>
        </div>
    }</div>
}

export default GameLogic;