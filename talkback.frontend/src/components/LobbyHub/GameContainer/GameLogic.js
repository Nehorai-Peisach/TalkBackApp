import './GameLogic.css';
import { useState, useEffect } from 'react'

const GameLogic = ({ dices, board, connection, chat }) => {
    const [activePiece, setActivePiece] = useState();

    const Update = (currentPlace, nextPlace) => {
        connection.invoke('UpdateBoard', chat, activePiece.id, currentPlace.id, nextPlace.id);
    }

    const onClick = (e) => {
        const element = e.target;
        if(activePiece && element.classList.contains('none-selected')){
            Update(activePiece.parentElement, element);
        }
        if(activePiece && activePiece !== element){
            activePiece.style.border = '';
            setActivePiece(null);
        }
        if((element.classList.contains("white") || element.classList.contains("black"))){
            element.style.zIndex = '2';
            element.style.border = 'solid #ffff 2px'
    
            setActivePiece(element);
        }   
    }

    useEffect(() => {
        resetColor();
        if(!activePiece) return;

        let color = '';
        const placeId = parseInt(activePiece.parentElement.id.match(/\d+/));
        if(activePiece.classList.contains('black')){
            color = 'black';
            if(dices[0] > 0)colorIt(placeId+dices[1], color);
            if(dices[2] > 0)colorIt(placeId+dices[3], color);
        }
        if(activePiece.classList.contains('white')){
            color = 'white';
            if(dices[0] > 0)colorIt(placeId-dices[1], color);
            if(dices[2] > 0)colorIt(placeId-dices[3], color);
        }
    }, [activePiece])

    const colorIt = (num, color) => {
        if(num<1 || num>24) return;

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

    const RollDice = () => {
        debugger
        connection.invoke('RollDice', chat);
    }

    return <div className={'flex'} onClick={e => onClick(e)}>
        <div>
            <button onClick={() =>RollDice()}>Roll</button>
            <div className={'flex'}>
                <div>{dices[0]}</div>
                <div className={'dice dice'+dices[1]}/>
                <div>{dices[2]}</div>
                <div className={'dice dice'+dices[3]}/>
            </div>
        </div>
        {board}
    </div>
}

export default GameLogic;