const UpdateGame = (move, midRef) => {

    //Initialize
    debugger
    const piece = document.getElementById(move[0]);
    const currentPlace = document.getElementById(move[1]);
    const nextPlace = document.getElementById(move[2]);

    //Checks
    if(nextPlace.children.length === 0){
        nextPlace.appendChild(piece);
        return;
    }

    if(piece.className === nextPlace.children[0].className){
        nextPlace.appendChild(piece);
        return;
    }

    const otherPiece = nextPlace.children[0];
    if(midRef.current && nextPlace.children.length === 1){
        midRef.current.appendChild(otherPiece);
        nextPlace.appendChild(piece);
    }
}

export default UpdateGame;