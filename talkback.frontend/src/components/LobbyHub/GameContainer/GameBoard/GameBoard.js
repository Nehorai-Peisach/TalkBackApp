import './GameBoard.css';
import { useRef, useState} from 'react'
import CreatBoard from './Board';

const GameBoard = ({board, connection, chat }) => {
    const [activePiece, setActivePiece] = useState();
    const boardRef = useRef();

    const Update = (currentPlace, nextPlace) => {
        connection.invoke('UpdateBoard', chat, activePiece.id, currentPlace.id, nextPlace.id);
    }

    const onClick = (e) => {
        const element = e.target;
        const gameBoard = boardRef.current;
        if(activePiece && element.classList.contains('triangle')){
            Update(activePiece.parentElement, element);
        }
        if(activePiece && activePiece !== element){
            activePiece.style.border = '';
            setActivePiece(null);
        }
        if((element.classList.contains("whitePeice") || element.classList.contains("blackPeice")) && gameBoard){
            element.style.zIndex = '2';
            element.style.border = 'solid #ffff 2px'
    
            setActivePiece(element);
        }
    }

    return <div className='home' ref={boardRef} onClick={e => onClick(e)}>
        {board}
    </div>
}

export default GameBoard;