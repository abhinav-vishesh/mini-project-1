let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = level;
let btns = ['red' , 'yellow' ,'green' , 'purple'];
let h2 = document.querySelector('h2');
let btnAudio = document.querySelector('#btnAudio');
let wrongAudio = document.querySelector('#wrongAudio');

document.addEventListener('keypress' , function(){
    if(started == false){
    console.log('game started',highScore);
    started = true;

     levelUp();
}});


function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash')
    },250);
    btnAudio.play();
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    if(level > highScore){
        highScore = level;
    }

    let rando = Math.floor(Math.random() *4);
    let rando_color = btns[rando];
    let rando_btn = document.querySelector(`.${rando_color}`);
    gameSeq.push(rando_color);

    btnFlash(rando_btn);
}

function checkAns(idx){

    if(gameSeq[idx]===userSeq[idx]){
        if(gameSeq.length === userSeq.length){
            setTimeout(levelUp , 1000);
        }
    }else{
        if(level<highScore){
            h2.innerHTML =  `GAME OVER !  You score was <b>${level}</b><br>Press any key to restart`;
        }else{
            h2.innerHTML = `GAME OVER ! New High-Score is ${highScore}<br>Press any key to restart`;
        }
        wrongAudio.play();
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    btnColor = btn.getAttribute("id");
    userSeq.push(btnColor);

    checkAns(userSeq.length-1);
}

let buttons = document.querySelectorAll('.btn');

for(btn of buttons){
    btn.addEventListener('click' , btnPress);
}
function reset(){
    level = 0;
    started = false;
    gameSeq = [];
    userSeq = [];
}