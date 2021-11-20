import Triangle from "../Tile/Triangle"

const triangles= [];
const White = <div className='whitePeice'/>;
const Black = <div className='blackPeice'/>;
const makeBoard = () => {
    for (let index = 0; index <= 24; index++) {
        let input;
        switch(index){
            case 1: input= amount(2,White); break;
            case 6: input= amount(5,Black); break;
            case 8: input= amount(3,Black); break;
            case 12: input= amount(5,White); break;
            case 13: input= amount(5,Black); break;
            case 17: input= amount(3,White); break;
            case 19: input= amount(5,White); break;
            case 24: input= amount(2,Black); break;
        }
        
        if(index < 13){
            if(index % 2 === 0){
                triangles.push(<Triangle number={index} triangleType={'boardRedPartdown'} pieces={input}/>)
            } else{
                triangles.push(<Triangle number={index} triangleType={'boardBlackPartdown'} pieces={input}/>)
            }
        }
        else{
            if(index % 2 === 0){
                triangles.push(<Triangle number={index} triangleType={'boardBlackPartup'} pieces={input}/>)
            } else{
                triangles.push(<Triangle number={index} triangleType={'boardRedPartup'} pieces={input}/>)
            }
        }
    }
}
const amount = (number, piece) => {
    const lst = [];
    for (let i = 0; i < number; i++) {
           lst.push(piece);
    }
    return lst;    
}

const Board = () =>{
    
    
    return <div className='board'>
    {makeBoard()}
    <div className='side'>
        <div className='topSide'/>
        <div className='leftSide'/>
        <div className='boardtop'>
            {triangles[1]}
            {triangles[2]}
            {triangles[3]}
            {triangles[4]}
            {triangles[5]}
            {triangles[6]}
        </div>
        <div className='boardbot'>
            {triangles[13]}
            {triangles[14]}
            {triangles[15]}
            {triangles[16]}
            {triangles[17]}
            {triangles[18]}
        </div>
        <div className='rightSide'/>
        <div className='botSide'/>
    </div>
    <div className='side'>
        <div className='topSide'/>
        <div className='leftSide'/>
        <div className='boardtop'>
            {triangles[7]}
            {triangles[8]}
            {triangles[9]}
            {triangles[10]}
            {triangles[11]}
            {triangles[12]}
        </div>
        <div className='boardbot'>
            {triangles[19]}
            {triangles[20]}
            {triangles[21]}
            {triangles[22]}
            {triangles[23]}
            {triangles[24]}
        </div>
        <div className='rightSide'/>
        <div className='botSide'/>
    </div>
</div>
}
export default Board;