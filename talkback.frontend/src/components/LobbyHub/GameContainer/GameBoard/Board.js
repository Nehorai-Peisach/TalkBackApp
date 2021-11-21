import './Board.css';

export const Triangles = [];
const White = (id) => <div id={'P'+id} className='whitePeice'/>;
const Black = (id) => <div id={'P'+id} className='blackPeice'/>;

export const MakeBoard = () =>{
    const w = [];
    const b = [];
    for (let i = 1; i <= 30; i++) {
        if(i<=15) w.push(White(i))
        else b.push(Black(i))
    }
    for (let index = 0; index <= 24; index++) {
        let input= []
        switch(index){
            case 1:  input= Array(b[0], b[1]);break;
            case 6:  input= Array(w[10], w[11], w[12], w[13], w[14]);break;
            case 8:  input= Array(w[7], w[8], w[9]);break;
            case 12: input= Array(b[2], b[3], b[4], b[5], b[6]);break;
            case 13: input= Array(w[2], w[3], w[4], w[5], w[6]);break;
            case 17: input= Array(b[7], b[8], b[9]);break;
            case 19: input= Array(b[10], b[11], b[12], b[13], b[14]);break;
            case 24: input= Array(w[0], w[1]);break;
        }
        
        if(index < 13){
            if(index % 2 === 0){
                Triangles.push(<div id={'T'+index} className={'boardRedPartdown triangle'}>{input}</div>)
            } else{
                Triangles.push(<div id={'T'+index} className={'boardBlackPartdown triangle'}>{input}</div>)
            }
        }
        else{
            if(index % 2 !== 0){
                Triangles.push(<div id={'T'+index} className={'boardBlackPartup triangle'}>{input}</div>)
            } else{
                Triangles.push(<div id={'T'+index} className={'boardRedPartup triangle'}>{input}</div>)
            }
        }
    }
}

const CreatBoard = ({midRef}) => {
    return <div className='board'>
        <div className='outline1'/>
        <div className='outline2'/>
        <div className='topleft'>
            {Triangles[12]}
            {Triangles[11]}
            {Triangles[10]}
            {Triangles[9]}
            {Triangles[8]}
            {Triangles[7]}
        </div>
        <div className='seperetorLeft'/>
        <div className='botleft'>
            {Triangles[13]}
            {Triangles[14]}
            {Triangles[15]}
            {Triangles[16]}
            {Triangles[17]}
            {Triangles[18]}
        </div>
        <div ref={midRef} className='mid'/>
        <div className='topRight'>
            {Triangles[6]}
            {Triangles[5]}
            {Triangles[4]}
            {Triangles[3]}
            {Triangles[2]}
            {Triangles[1]}
        </div>
        <div className='seperetorRight'/>
        <div className='botRight'>
            {Triangles[19]}
            {Triangles[20]}
            {Triangles[21]}
            {Triangles[22]}
            {Triangles[23]}
            {Triangles[24]}
        </div>
    </div>
}

export default CreatBoard;