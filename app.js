//step 1-------if any key is pressed then the game satrts

let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});

//second step is a random button will flash and we go one level up
 
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //any random button will flash;
    let randIndx=Math.floor(Math.random()*3);
    let randColor=btns[randIndx];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log("game sequence is :",gameSeq);
    gameFlash(randbtn);
}


//now its time for step3 to addEventListeners so as to check game sequence and user sequence

function checkAns(idx){
    
    if(userSeq[idx]==gameSeq[idx]){
        // console.log("same value");// FROM HERER WE HAVE TWO CASES ...EITHER WE ARE IN MIDDLE OF SEQUENCE OR AT THE END OF THE SQUENCE
        if(userSeq.length==gameSeq.length){
           setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`GAME OVER! YOUR SCORE WAS <b>${level}</b> <br> PRESS ANY KEY TO START AGAIN`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="hsl(225, 100%, 92%)";

        },150)
        reset();
    }
}

function btnPress(){
    // console.log("button was pressed");
    let btn=this;
    userFlash(btn);

   let userColor=btn.getAttribute("id");
   userSeq.push(userColor);
   console.log("user seq is :" ,userSeq);
   
   checkAns(userSeq.length-1);
    
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}