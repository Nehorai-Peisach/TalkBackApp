import Tile from "../Tile/Tile"

const Board = () =>
<div className='board'>
    <div className='side'>
        <div className='topSide'/>
        <div className='leftSide'/>
        <div className='boardtop'>
            <Tile number={12}/>
            <Tile number={11}/>
            <Tile number={10}/>
            <Tile number={9}/>
            <Tile number={8}/>
            <Tile number={7}/>
        </div>
        <div className='boardbot'>
            <Tile number={13}/>
            <Tile number={14}/>
            <Tile number={15}/>
            <Tile number={16}/>
            <Tile number={17}/>
            <Tile number={18}/>
        </div>
        <div className='rightSide'/>
        <div className='botSide'/>
    </div>
    <div className='side'>
        <div className='topSide'/>
        <div className='leftSide'/>
        <div className='boardtop'>
            <Tile number={6}/>
            <Tile number={5}/>
            <Tile number={4}/>
            <Tile number={3}/>
            <Tile number={2}/>
            <Tile number={1}/>
        </div>
        <div className='boardbot'>
            <Tile number={19}/>
            <Tile number={20}/>
            <Tile number={21}/>
            <Tile number={22}/>
            <Tile number={23}/>
            <Tile number={24}/>
        </div>
        <div className='rightSide'/>
        <div className='botSide'/>
    </div>
</div>

export default Board;