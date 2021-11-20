import './GameBoard.css';
import Board from './Board';
import React, {useRef, useState} from 'react'
import Rules from '../GameRules/Rules';
// import { GamePieces } from '../Tile/Tile';

interface Piece {
    x: number;
    y: number;
}

const intialBoard: Piece[] = [];

export default function GameBoard() {
    let board = <Board/>
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [pieces, setPieces] =useState<Piece[]>(intialBoard);
    const rules = new Rules();
    let privousTri;

    const boardRef = useRef<HTMLDivElement>(null);

    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);

    function dropPiece(e: React.MouseEvent){
        const gameBoard = boardRef.current;
        if(activePiece && gameBoard){
            const x = Math.floor((e.clientX - gameBoard.offsetLeft)/50);
            const y = Math.ceil(Math.abs((e.clientY - gameBoard.offsetTop - 650)/50));

            
            //Update the piece position
            activePiece.style.zIndex = '1';
            console.log(x,y);
            // setPieces((value) => {
            //     const pieces = value.map((p) => {
            //         if(p.x === gridX && p.y === gridY){
            //             rules.isValidMove(gridX, gridY, x, y);
            //             p.x = x;
            //             p.y = y;
            //         }
            //         return p;
            //     });
            //     return pieces;
            // })
            setActivePiece(null);
        }
    }
    
    function grabPiece(e: React.MouseEvent){
        const element = e.target as HTMLElement;
        const gameBoard = boardRef.current;
        if((element.classList.contains("whitePeice") || element.classList.contains("blackPeice")) && gameBoard){
            setGridX(Math.floor((e.clientX - gameBoard.offsetLeft)/50));
            setGridY(Math.abs(Math.ceil(e.clientY - gameBoard.offsetTop - 650) / 50));
            element.style.zIndex = '2';
            setActivePiece(element);
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
            activePiece.style.left = `${x}px`;
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
    onMouseUp={(e)=> dropPiece(e)}
    onMouseMove={e=> movePiece(e)}
    onMouseDown={e => grabPiece(e)}
    className='board'>
        {board}</div>
}