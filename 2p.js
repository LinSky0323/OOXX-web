import { create, upState,p1,p2, getPlayer, checkWin, changePlayer, getPlayerIdx, findLine } from "./game";
import { Create, OOXX, drawLine } from "./lib";
import circle from '/circle.svg';
import cross from '/cross.svg';

let board=create()
const play=[circle,cross];

function Click(i,j){
    let player=play[getPlayerIdx()];
    const[newBoard,success]=upState(getPlayer(),[i,j],board);
    OOXX(player,i,j);
    const winner=checkWin(newBoard);
    if (winner=="平手"){
        setTimeout(()=>{
        alert("平手!");
        location.replace("/result.html?winner=平手")
        },100)
        
        return;
    }
    if(winner!==null){
        const L=findLine(winner,newBoard);
        drawLine(L[0][0],L[0][1],L[1][0],L[1][1]);
      setTimeout(()=>{
       alert(`${winner} Win !`);
       location.replace("/result.html?winner="+winner);
       },1000)
        
        return
    }
    
    changePlayer()
    board=newBoard;

    const cell=document.querySelectorAll(".cell");
    cell[i*3+j].classList.add("occupied");
}


function addEvent(){
    const cell=document.querySelectorAll(".cell");
    for (let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            cell[i*3+j].addEventListener("click",()=>Click(i,j));
            
        }
    }

}



Create()
addEvent()
