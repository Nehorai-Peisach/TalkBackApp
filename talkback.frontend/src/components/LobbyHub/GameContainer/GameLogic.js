import './GameLogic.css';
import { useState, useEffect } from 'react'
import UpdateGame from './UpdateGame'
import useSound from 'use-sound';
import pieceSound from '../../../assets/sounds/piece.mp3';
import diceSound from '../../../assets/sounds/dice.mp3';

const GameLogic = ({ move, currentUser, turn, color, setDices, dices, board, connection, chat }) => {
    const [activePiece, setActivePiece] = useState();

    let [playPiece] =useSound(pieceSound);
    let [playDice] =useSound(diceSound);
    
    const Update = (currentPlace, nextPlace) => {
        connection.invoke('UpdateBoard', chat, activePiece.id, currentPlace.id, nextPlace.id);
    }

    const RollDice = () => {
        connection.invoke('RollDice', chat);
        connection.invoke('NextTurn', chat ,color);
    }
    const onClick = (e) => {
        if(turn !== color) return;

        const element = e.target;
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
                if(dices[0] > 0)colorIt(dices[1]);
                if(dices[2] > 0)colorIt(dices[3]);
            }
            if(color === 'white'){
                if(dices[0] > 0)colorIt(25-dices[1]);
                if(dices[2] > 0)colorIt(25-dices[3]);
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
    }, [activePiece]);


    const colorIt = (num, placeId) => {
        if(color === 'black' && num > 24){
            if(checkValidToOut(1, (25-placeId), 19, placeId-1)) PieceOut(1, 18);
            if(checkValidToOut(3, (25-placeId), 19, placeId-1)) PieceOut(1, 18);
            return;
        }
        if(color === 'white' && num < 1){
            if(checkValidToOut(1, placeId, placeId+1, 6)) PieceOut(7, 24);
            if(checkValidToOut(3, placeId, placeId+1, 6)) PieceOut(7, 24);
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

    const checkValidToOut = (diceNum, placeNum, from, to) => {
        if(dices[diceNum] === (placeNum) && dices[diceNum-1] > 0) return true;

        if(dices[diceNum-1] > 0){
            for (let i = from; i <= to; i++) {
                let place = document.getElementById('T'+i);
                if(place.children[1] && place.children[1].classList.contains(color)) return false;
            }
            return true;
        }
        return false;
    }

    const PieceOut = (from, to) => {
        for (let i = from; i <= to; i++) {
            let place = document.getElementById('T'+i);
            for (let j = 0; j < place.children.length; j++) {
                if(place.children[j].classList.contains(color)) return;
            }
        }
        document.getElementById('pieceOut').className = 'pieceOut';
    }

    useEffect(() => {
        if(dices)
        playDice();
        checkCnatMoveBtn();
        let colorWin = checkEnd();
        if(colorWin){
            connection.invoke("EndGame", chat, colorWin);
        }
    }, [dices])

    useEffect(() => {
        if(move && dices) {
            checkCnatMoveBtn();
            UpdateGame(color, turn,  move, dices, setDices, connection, chat);
            playPiece();
            let colorWin = checkEnd();
            if(colorWin){
                connection.invoke("EndGame", chat, colorWin);
            }
        }
    }, [move]);
    
    useEffect(() => {
        if(!turn || !color) return;
        let myTurn = document.getElementById('myTurn');
        let otherTurn = document.getElementById('otherTurn');
        if(!myTurn || !otherTurn) return;
        
        if(turn === color){
            myTurn.className = 'userInfo turn';
            otherTurn.className = 'userInfo';
        }
        else{
            myTurn.className = 'userInfo';
            otherTurn.className = 'userInfo turn';
        }
        
        checkCnatMoveBtn();
    }, [turn]);
    
    const checkEnd = () => {
        var tmpColor;
        for (let i = 1; i <= 24; i++) {
            let place = document.getElementById('T'+i);
            if(place && place.children[1]){
                if(tmpColor && (tmpColor+' piece') !== place.children[1].className) return null;
                if(place.children[1].classList.contains('white')) tmpColor='white';
                if(place.children[1].classList.contains('black')) tmpColor='black';
            }
        }
        return tmpColor;
    }

    const checkCnatMoveBtn = () => {
        let btn = document.getElementById('cantMoveBtn');
        if(!btn) return;
        
        if(color && turn && color === turn && !checkIfCanMove()){
            btn.disabled = false;
            btn.className = '';
        }
        else {
            btn.disabled = true;
            btn.className = 'cantMoveBtn';
        }
    };

    const checkIfCanMove = () => {

        let mid = document.getElementById('MidPart');
        if(mid && mid.children.length > 0){
            for (let i = 0; i < mid.children.length; i++) {
                if(mid.children[i] && mid.children[i].classList.contains(color)){
                    if(dices[0] > 0 && checkIfCanGoToPlaceByDice(1)) return true;
                    if(dices[2] > 0 && checkIfCanGoToPlaceByDice(3)) return true;
                    return false;
                }
            }
        }

        for (let i = 1; i <= 24; i++) {
            let triangle = document.getElementById('T'+i);
            if(!triangle) return true;

            if(!triangle.children[1]) continue;
            if(triangle.children[1].classList.contains(color)){
                if(dices[0] > 0 && chackNextMoveValid(i,1)) return true;
                if(dices[2] > 0 && chackNextMoveValid(i,3)) return true;
            }
        }
        return false;
    }

    const checkIfCanGoToPlaceByDice = (diceNum) =>{
        let tplace;
        if(color === 'white') tplace = 25 - dices[diceNum];
        if(color === 'black') tplace = dices[diceNum];

        let place = document.getElementById('T'+tplace).children;
        if(!place[2]) return true;
        if(place[2].classList.contains(color)) return true;
        return false;
    }

    const chackNextMoveValid = (placeNum, diceNum) => {
        let num = 0;
        if(color === 'white') num = placeNum - dices[diceNum];
        if(color === 'black') num = placeNum + dices[diceNum];

        let nextPlace = document.getElementById('T'+num);
        if(nextPlace){
            if(!nextPlace.children[2]) return true;
            if(nextPlace.children[2].classList.contains(color)) return true;
        }
        return false;
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
                        <div id={'otherTurn'} className='userInfo'>{(chat.users[0] === currentUser.username)?chat.users[1]:chat.users[0]}</div>
                        <div className={'topPiece '+ (color === 'white'?'black':'white')}/>
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