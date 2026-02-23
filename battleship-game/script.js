const gameArea = document.querySelector(".game-area")
const gameMsg = document.querySelector(".game-msg")
const msgText = document.querySelector(".msg-text")
const resetBtn = document.querySelector(".reset")
const ok = document.querySelector(".ok")
let order =[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]

let clickCount = 0;
let shipCount=0

function addRandomNess(arr){
    for(let i=0;i<10;i++){
        let l = getRandomIdx()
        let r = getRandomIdx()
        let temp = arr[l];
        arr[l] = arr[r];
        arr[r]=temp
    }
    return arr;
}

function getRandomIdx(){
    let max = 16; //exclusive
    let min = 0
    return Math.floor(Math.random() * (max - min) + min); ;
}

function createHtml(){
    order = addRandomNess(order)
    console.log(order)
    let html = ""
    for(let i=0;i<16;i++){
        if(order[i]===1){//it is ship
            html+=`<div class="cell" data-open="false" data-idx="${i}">
                <img src="https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png" alt="ship">
            </div>`
        }else{
            html+=`<div class="cell" data-open="false" data-idx="${i}">
                <img src="https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp" alt="ship">
            </div>`
        }
    }
    return html;
}

ok.addEventListener("click",()=>{
    gameMsg.close();
    //needs reset 
    reset();
})
resetBtn.addEventListener("click",()=>{
    reset();
})

function reset(){
    clickCount=0;
    shipCount=0;
    gameArea.innerHTML=createHtml();
}

function addEventListenerForCell(){
    gameArea.addEventListener("click",(e)=>{
        const cell = e.target.closest('.cell');
        const img = cell.querySelector('img');
        if(cell.dataset.open==="false"){
            // console.log(`click ${++clickCount}`)
            img.style.opacity=1;
            if(order[Number(cell.dataset.idx)]==1){
                shipCount++;
                console.log("Found ship")
            }
            cell.dataset.open="true" 
        }
        if (shipCount === 5) {
        msgText.innerText = "You Won!";
        gameMsg.showModal();
        } else if (clickCount >= 8) {
            msgText.innerText = "You Lose!";
            gameMsg.showModal();
        }
    })
}

function initGame(){
    reset()
    addEventListenerForCell()
}

initGame()