import { create, upState,p1,p2, getPlayer, checkWin, changePlayer, getPlayerIdx, findLine, PCMove } from "./game";
import { Create, OOXX, drawLine } from "./lib";
import circle from '/circle.svg';
import cross from '/cross.svg';




const queryString=window.location.search;
const key=new URLSearchParams(queryString);
const Player=key.get("player");
const pc=Player=="first"?p2:p1;


let board=create()
const play=[circle,cross];

async function Click(i,j){
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

    board=newBoard;
    changePlayer()

    const cell=document.querySelectorAll(".cell");
    cell[i*3+j].classList.add("occupied");

    await wait();
    const move=PCMove(getPlayer(),board);
    const [newBoard1,success1]=upState(getPlayer(),move,board)
    OOXX(play[getPlayerIdx()],move[0],move[1]);

    const winner1=checkWin(newBoard1);
    if (winner1=="平手"){
        setTimeout(()=>{
        alert("平手!");
        location.replace("/result.html?winner=平手")
        },100)
        
        return;
    }
    if(winner1!==null){
        const L=findLine(winner1,newBoard1);
        drawLine(L[0][0],L[0][1],L[1][0],L[1][1]);
      setTimeout(()=>{
       alert(`${winner} Win !`);
       location.replace("/result.html?winner="+winner);
       },1000)
        
        return
    }


    board=newBoard1;
    changePlayer()
}


function addEvent(){
    const cell=document.querySelectorAll(".cell");
    for (let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            cell[i*3+j].addEventListener("click",()=>Click(i,j))
        }
    }

}

async function wait(){
    return new Promise((e)=>setTimeout(e,500))
}


Create()
console.log(pc,getPlayer(),play,getPlayerIdx())
if(pc==getPlayer()){
    await wait()
    const move=PCMove(getPlayer(),board);
    const [newBoard1,success]=upState(getPlayer(),move,board)
    OOXX(play[getPlayerIdx()],move[0],move[1]);
    board=newBoard1;
    changePlayer()
}
addEvent()


