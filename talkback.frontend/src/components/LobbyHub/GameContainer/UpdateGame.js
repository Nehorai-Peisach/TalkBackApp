const UpdateGame = (move, dices, setDices) => {

    //Initialize
    const piece = document.getElementById(move[0]);
    const currentPlace = document.getElementById(move[1]);
    const nextPlace = document.getElementById('T'+move[2].match(/\d+/));
    const midPart = document.getElementById('MidPart');

    //Checks
    //movment side
    const currentId = parseInt(currentPlace.id.match(/\d+/));
    const nextId = parseInt(nextPlace.id.match(/\d+/));
    debugger
    if(piece.className == 'black piece'){
        if(nextId - currentId === dices[1]) dices[0]--;
        if(nextId - currentId === dices[3]) dices[2]--;

    }
    if(piece.className == 'white piece'){
        if(currentId - nextId === dices[1]) dices[0]--;
        if(currentId - nextId === dices[3]) dices[2]--;
    }
    setDices(dices);

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

export default UpdateGame;