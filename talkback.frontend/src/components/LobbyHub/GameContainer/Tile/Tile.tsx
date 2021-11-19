import './Tile.css'

interface Props {
    number: number
}
const White = <div className='whitePeice'/>;
const Black = <div className='blackPeice'/>;

const amount = (num: number, peice: {}) => {
    const lst = [];
    for (let i = 0; i < num; i++) {
           lst.push(peice)
    }
    return lst;
}

export default function Tile({number}: Props) {
    let input;
    switch(number){
        case 1: input= amount(2,White); break;
        case 6: input= amount(5,Black); break;
        case 8: input= amount(3,Black); break;
        case 12: input= amount(5,White); break;
        case 13: input= amount(5,Black); break;
        case 17: input= amount(3,White); break;
        case 19: input= amount(5,White); break;
        case 24: input= amount(2,Black); break;
    }


    if(number < 13){
        if(number % 2 === 0){
            return <div key={number} className='boardBlackPartdown'>{input}</div>
        } else{
            return <div key={number} className='boardRedPartdown'>{input}</div>
        }
    }
    else{
        if(number % 2 === 0){
            return <div key={number} className='boardBlackPartup'>{input}</div>
        } else{
            return <div key={number} className='boardRedPartup'>{input}</div>
        }
    }
}