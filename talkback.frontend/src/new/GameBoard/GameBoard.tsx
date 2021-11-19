import './GameBoard.css';
import Board from './Board';

let activePiece: HTMLElement | null= null;
function grabPiece(e: React.MouseEvent){
    if(activePiece){
        activePiece = null;
        return;
    }
    const element = e.target as HTMLElement;
    if(element.classList.contains("whitePeice") || element.classList.contains("blackPeice")){
        console.log(e);

        const x = e.clientX -30;
        const y = e.clientY -30;
        element.style.position = 'absolute';
        element.style.height = '60px';
        element.style.width = '60px';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
    }
}

function movePiece(e: React.MouseEvent){
    if(activePiece){
        const x = e.clientX -30;
        const y = e.clientY -30;
        activePiece.style.position = 'absolute';
        activePiece.style.height = '60px';
        activePiece.style.width = '60px';
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
    }
}

export default function GameBoard() {
    const board = <Board/>
    return <div onMouseMove={e=> movePiece(e)} onMouseDown={e => grabPiece(e)} className='board'>{board}</div>
}