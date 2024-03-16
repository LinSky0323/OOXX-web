export const p1="O";
export const p2="X";
export const n=" ";
export const Draw="draw";
let player=0;

export function create(){
    return[[n,n,n],[n,n,n],[n,n,n]]
 }

 export function upState(player,p,state){
    const i=p[0];
    const j=p[1];

    if(p[0]<0 || p[0]>state[0].length){
        return [state,false];
    }
    if(p[1]<0 || p[1]>state[0].length){
        return [state,false];
    }
    if(state[p[0]][p[1]]!==n){
        return [state,false];
    }
    const newState=state.map((row,rowIndex)=>{
        return row.map((i,columnIndex)=>{
            if(rowIndex===p[0] && columnIndex===p[1]){
                return player;
            }
            return i
        })
    })
    return [newState,true];
 }

 export function checkWin(state){
    const winner=row(state) || column(state)||dig(state);
    const full=tie(state);
    if(winner != null){return winner};
    if(full){return "平手"};
    return null;
 }
 function row(state){
    for(const i of state){
        if(i.every(k=>k==i[0] && i[0]!=n)){
            return i[0];
        }
    }
    return null;
 }
 function column(state){
    for(let i=0;i<state.length;i++){
        const col=state.map((j)=>j[i]);
        if(col.every((value)=>value==col[0]) && col[0]!==n){
            return col[0];
        }
    }
    return null;
 }
 function dig(state){
    const d1=state.map((j,i)=>j[i])
    const d2=state.map((j,i)=>j[j.length-i-1])
    if(d1.every((value)=>value==d1[0]) && d1[0]!==n){
        return d1[0];
    }
    if(d2.every((value)=>value==d2[0]) && d2[0]!==n){
        return d2[0];
    }
    return null;
 }

 export function findLine(winner,state){
    for(let i=0;i<3;i++){
        if(state[i].every(k=>k==winner)){
            return[[i,0],[i,2]]
        }
        const col=state.map((j)=>j[i]);
        if(col.every((value)=>value==winner)){
            return[[0,i],[2,i]]
        }
        if(state[0][0]==winner&&state[1][1]==winner&&state[2][2]==winner){
            return[[0,0],[2,2]]
        }
        if(state[2][0]==winner&&state[1][1]==winner&&state[0][2]==winner){
            return[[0,2],[2,0]]
        }
    }
    

 }
 function tie(state){
    for(let i=0;i<state.length;i++){
        for(let j=0;j<state[i].length;j++){
            if(state[i][j] == n){
                return false
            }
        }
    }
    return true;
 }

 export function getPlayer(){
    if(player%2===0){
        return p1;
    }
    else{
        return p2;
    }
}
export function getPlayerIdx(){
    if(player%2===0){
        return 0;
    }
    else{
        return 1;
    }
}

export function changePlayer(){
    player+=1;
}
export function PCMove(player,state){
const moves=getN(state);
const score=moves.map(([i,j])=>{
    const [newState,success]=upState(player,[i,j],state);
    return comScore(player,0,newState);
})
const best=player===p1?Math.max(...score):Math.min(...score);
const bestIdx=score.indexOf(best);
const[row,col]=moves[bestIdx];
return[row,col];
}
function comScore(player,times,newState){
    const winner=checkWin(newState);
    if(winner===p1){return 10-times};
    if(winner===p2){return times-10};
    if(winner==="平手"){return 0};

    const move=getN(newState);
    const nextPlayer=turnNext(player)
    const score=move.map(([i,j])=>{
        const[newStates,success]=upState(nextPlayer,[i,j],newState);
        return comScore(nextPlayer,times+1,newStates);
    })
    if(nextPlayer===p2){
        return Math.min(...score)
    }
    if(nextPlayer===p1){
        return Math.max(...score)
    }
}
function turnNext(player){
    if(player==p1){return p2}
    if(player==p2){return p1};
}
function getState(player,moves,state){
    const states=[];
    for(const i of moves){
        const[newState,success]=upState(player,i,state);
        states.push(newState);
    }
    return states;
}

function getN(state){
    const moves=[];
    for(let i=0;i<state.length;i++){
    const row =state[i];
    for(let j=0;j<row.length;j++){
        if(row[j]===n){
            moves.push([i,j])
        }
    }
    }
    return moves;S
}



 export default {
create,
upState,
checkWin,
p1,
p2,
n,
getPlayer,
changePlayer,
PCMove,
 }