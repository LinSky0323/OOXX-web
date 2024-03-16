const BoardW=600;
const CellW=BoardW/3;
const MarkW=CellW*0.5;
const LineL=560;
const LineW=20;

export function Create(){
    drawHBoard(1);
    drawHBoard(2);
    drawSBoard(1);
    drawSBoard(2);
}

function drawHBoard(i){
    const app=document.querySelector("#app");
    const line=document.createElement("div");
    line.style.position="absolute";
    line.style.top=`${i*CellW-LineW/2}px`;
    line.style.left=`${(BoardW-LineL)/2}px`;
    line.style.width=`${LineL}px`;
    line.style.height=`${LineW}px`;
    line.style.backgroundColor="black";
    line.style.borderRadius="10px";

    app.appendChild(line);
}

function drawSBoard(i){
    const app=document.querySelector("#app");
    const line=document.createElement("div");
    line.style.position="absolute";
    line.style.top=`${(BoardW-LineL)/2}px`;
    line.style.left=`${i*CellW-LineW/2}px`;
    line.style.width=`${LineW}px`;
    line.style.height=`${LineL}px`
    line.style.backgroundColor="black";
    line.style.borderRadius="10px";

    app.appendChild(line);
}
export function OOXX(svg,i,j){
    const app=document.querySelector("#app");
    const mark=document.createElement("img");
    mark.src=svg;
    mark.style.width=`${MarkW}px`;
    mark.style.heigjt=`${MarkW}px`;
    mark.style.position="absolute";
    mark.style.top=`${i*CellW+CellW/2-MarkW/2}px`
    mark.style.left=`${j*CellW+CellW/2-MarkW/2}px`
    app.appendChild(mark);
}

export function drawLine(i1,j1,i2,j2){
    const app=document.querySelector("#app");
    const line=document.createElement("div");
    line.style.position="absolute";
    line.style.height="20px";
    line.style.top=`${i1*CellW+CellW/2-LineW/2}px`;
    line.style.left=`${j1*CellW+CellW/2-LineW/2}px`;
    line.style.borderRadius="10px";
    line.style.backgroundColor="green";
    line.style.transformOrigin="left";
    
    const v1=[i2-i1,j2-j1];
    const v2=[0,1];
    const v1L=Math.sqrt(v1[0]**2+v1[1]**2);
    const v2L=Math.sqrt(v2[0]**2+v2[1]**2);
    const cosTheta=(v1[0]*v2[0]+v1[1]*v2[1])/(v1L*v2L);
    const theta=Math.acos(cosTheta);
    line.style.transform=`rotate(${theta}rad)`;
    line.style.transition="width 0.5s";
    line.style.width="0px";
    setTimeout(()=>{
    line.style.width=`${BoardW*v1L*0.66/2}px`;
    },0)
    

    app.appendChild(line);
}

