import { p1 } from './game';
import circle from '/circle.svg';
import cross from '/cross.svg';

const queryString=window.location.search;
const key=new URLSearchParams(queryString);
const winner=key.get("winner");
const result=document.querySelector("#result");
if(winner=="平手"){
    const text=document.createElement("span");
    text.innerText="平手!"
    result.appendChild(text)
}
else{
    const img=document.createElement("img")
    img.src=winner==p1?circle:cross;
    const text=document.createElement("span")
    text.innerText="獲勝!";
    result.appendChild(img);
    result.appendChild(text);
}


