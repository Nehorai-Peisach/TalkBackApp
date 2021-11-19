import './GameBoard.css';
import Board from './Board';
import {useRef} from 'react'

export default function GameBoard() {
    const board = <Board/>
    const boardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null= null;

    function dropPeice(){
        if(activePiece){
            activePiece.style.zIndex = '1';
            activePiece = null;
        }
    }
    
    function grabPiece(e: React.MouseEvent){
        const element = e.target as HTMLElement;
        if(element.classList.contains("whitePeice") || element.classList.contains("blackPeice")){
            element.style.zIndex = '2';
            activePiece = element;
        }
    }
    
    function movePiece(e: React.MouseEvent){
        const gameBoard = boardRef.current;
        if(activePiece && gameBoard){
            const minX = gameBoard.offsetLeft;
            const minY = gameBoard.offsetTop;
            const maxX = gameBoard.offsetLeft + gameBoard.clientWidth +100;
            const maxY = gameBoard.offsetTop + gameBoard.clientHeight-58;
            const x = e.clientX -30;
            const y = e.clientY -30;
            activePiece.style.position = 'absolute';
            activePiece.style.height = '5.6vh';
            activePiece.style.width = '5.6vh';
            // activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;

            if(x < minX){
                activePiece.style.left = `${minX}px`;
            } else if(x > maxX){
                activePiece.style.left = `${maxX}px`;
            } else{
                activePiece.style.left = `${x}px`;
            }

            if(y < minY){
                activePiece.style.top = `${minY}px`;
            } else if(y > maxY){
                activePiece.style.top = `${maxY}px`;
            } else{
                activePiece.style.top = `${y}px`;
            }
        }
    }

    return <div 
    ref={boardRef}
    onMouseUp={()=> dropPeice()}
    onMouseMove={e=> movePiece(e)}
    onMouseDown={e => grabPiece(e)}
    className='board'
    
    >{board}</div>
}