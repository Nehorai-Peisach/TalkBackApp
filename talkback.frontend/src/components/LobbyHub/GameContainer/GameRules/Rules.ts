
 export default class Rules{
     isValidMove(preX: number, preY: number, x: number, y: number){
         console.log('referee is checking...');
         console.log(`pre location: (${preX},${preY})`);
         console.log(`new location: (${x},${y})`);
         return true;
     }
 }