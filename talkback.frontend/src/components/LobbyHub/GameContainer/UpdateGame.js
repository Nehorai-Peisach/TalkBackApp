const UpdateGame = (color, turn, move, dices, setDices, connection, chat) => {

    //Initialize
    const piece = document.getElementById(move[0]);
    const currentPlace = document.getElementById(move[1]);
    const nextPlace = document.getElementById('T'+move[2].match(/\d+/));
    const midPart = document.getElementById('MidPart');

    //Checks
    const currentId = parseInt(currentPlace.id.match(/\d+/));

    if(move[2] === 'pieceOut'){
        document.getElementById('pieceOut').appendChild(piece);
        debugger
        if(piece.className === 'black piece'){
            if(dices[1] === 25 - currentId && dices[0]>0) dices[0]--;
            else if(dices[3] > 25 - currentId && dices[2]>0) dices[2]--;
            else if(dices[3] === 25 - currentId && dices[2]>0) dices[2]--;
            else if(dices[1] > 25 - currentId && dices[0]>0) dices[0]--;
            piece.className='none';
        }
        if(piece.className === 'white piece'){
            if(dices[1] === currentId && dices[0]>0) dices[0]--;
            else if(dices[3] > currentId && dices[2]>0) dices[2]--;
            else if(dices[3] === currentId && dices[2]>0) dices[2]--;
            else if(dices[1] > currentId && dices[0]>0) dices[0]--;
            piece.className='none';
        }
        setDices(dices);
        checkDices(connection, chat, dices, color, turn);
        return
    }

    const nextId = parseInt(nextPlace.id.match(/\d+/));
    if(move[1] === 'MidPart'){
        if(piece.classList.contains('black')){
            if(nextId === dices[1] && dices[0]>0) dices[0]--;
            else if(nextId === dices[3] && dices[2]>0) dices[2]--;
    
        }
        if(piece.classList.contains('white')){
            if(25 - nextId === dices[1] && dices[0]>0) dices[0]--;
            else if(25 - nextId === dices[3] && dices[2]>0) dices[2]--;
        }
        setDices(dices);
        checkDices(connection, chat, dices, color, turn);
    }
    else{
        if(piece.className === 'black piece'){
            if(nextId - currentId === dices[1] && dices[0]>0) dices[0]--;
            else if(nextId - currentId === dices[3] && dices[2]>0) dices[2]--;
    
        }
        if(piece.className === 'white piece'){
            if(currentId - nextId === dices[1] && dices[0]>0) dices[0]--;
            else if(currentId - nextId === dices[3] && dices[2]>0) dices[2]--;
        }
        setDices(dices);
        checkDices(connection, chat, dices, color, turn);
    }
    
    //go to empty
    if(nextPlace.children.length === 1){
        nextPlace.appendChild(piece);
        return;
    }
    //go to the same color
    if(piece.className === nextPlace.children[1].className){
        nextPlace.appendChild(piece);
        return;
    }
    //eat 1 in the other color
    if(nextPlace.children.length === 2){
        midPart.appendChild(nextPlace.children[1]);
        nextPlace.appendChild(piece);
    }
}

const checkDices = (connection, chat, dices, color, turn) => {
    if(connection && dices && chat){
        if(dices[0] === 0 && dices[2] === 0){
            connection.invoke('RollDice', chat);
            if(color===turn)
                connection.invoke('NextTurn', chat ,color);
        }
    }
}

export default UpdateGame;