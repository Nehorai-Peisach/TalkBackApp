import './Board.css';

export const Triangles = [];
const White = (id) => <div id={'P'+id} className='white piece'/>;
const Black = (id) => <div id={'P'+id} className='black piece'/>;
const none = (id) => <div id={'N'+id} className='none piece'/>;

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
            case 1:  input= [b[0], b[1]];break;
            case 6:  input= [w[10], w[11], w[12], w[13], w[14]];break;
            case 8:  input= [w[7], w[8], w[9]];break;
            case 12: input= [b[2], b[3], b[4], b[5], b[6]];break;
            case 13: input= [w[2], w[3], w[4], w[5], w[6]];break;
            case 17: input= [b[7], b[8], b[9]];break;
            case 19: input= [b[10], b[11], b[12], b[13], b[14]];break;
            case 24: input= [w[0], w[1]];break;
        }
        
        if(index < 13){
            if(index % 2 === 0){
                Triangles.push(<div id={'T'+index} className={'boardRedPartdown triangle'}>{none(index)}{input}</div>)
            } else{
                Triangles.push(<div id={'T'+index} className={'boardBlackPartdown triangle'}>{none(index)}{input}</div>)
            }
        }
        else{
            if(index % 2 !== 0){
                Triangles.push(<div id={'T'+index} className={'boardBlackPartup triangle'}>{none(index)}{input}</div>)
            } else{
                Triangles.push(<div id={'T'+index} className={'boardRedPartup triangle'}>{none(index)}{input}</div>)
            }
        }
    }
}

const CreatBoard = () => {
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
        <div id={'MidPart'} className='mid'/>
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