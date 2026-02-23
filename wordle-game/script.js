const wordleWords = [
  "apple", "beach", "brave", "cause", "chair", 
  "cloud", "dance", "dream", "earth", "event", 
  "faith", "flame", "glass", "green", "house", 
  "image", "juice", "light", "lucky", "money", 
  "music", "ocean", "party", "piano", "quiet", 
  "sharp", "smile", "storm", "table", "watch"
];

let selectedWord = findRandomWord()
let selectedWordArray = Array.from(selectedWord);
const wordInp = document.querySelector("#word-inp")
const submit = document.querySelector(".submit")
const msg = document.querySelector(".msg")
const reset = document.querySelector(".reset")
let noOfWordsSubmitted = 0;

function findRandomWord(){
    let min=0;
    let max = wordleWords.length
    let idx = Math.floor(Math.random()*(max-min)+min)
    console.log("selected Word : ",wordleWords[idx])
    return wordleWords[idx];
}

submit.addEventListener("click",()=>{
    let wordGivenByUser = wordInp.value.trim();
    wordGivenByUser= wordGivenByUser.toLowerCase()
    if(wordGivenByUser.length===5){
        //valid word
        ++noOfWordsSubmitted;
        wordInp.value=""
        const wordRepresentation = [0,0,0,0,0]
        const wordArray = Array.from(wordGivenByUser);
        //O(N^2)
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if(wordArray[i]===selectedWordArray[j]){
                    wordRepresentation[i]=-1;
                    if(i===j)wordRepresentation[i]=1;
                    break;
                }
            }
        }
        // //O(N)
        // for (let i = 0; i < 5; i++) {
        //     if(wordArray[i]===selectedWordArray[i]){
        //         wordRepresentation[i]=1;
        //     }
        // }
        // console.log(wordRepresentation);
        const rowToBeUpdated = document.querySelector(`.row-${noOfWordsSubmitted}`)
        // console.log(rowToBeUpdated)
        const cellsToBeUpdated = rowToBeUpdated.children
        // console.log(cellsToBeUpdated)
        for (let idx = 0; idx < 5; idx++) {
            cellsToBeUpdated[idx].innerHTML = getCellHtml(wordArray[idx],wordRepresentation[idx])
        }
        if(wordGivenByUser===selectedWord){
            msg.innerText ="Congratulations! You guessed the word!"
            submit.disabled=true
            return;
        }else{
            if(noOfWordsSubmitted===6){
                msg.innerText = `Game over, the word was "${selectedWord}" `
                submit.disabled=true
                return;
            }
        }

    }
})
reset.addEventListener("click",restartGame)

function getCellHtml(char,val){
    if(val===0){//Not present
        return `<div class="not-present">${char}</div>`
    }else if(val===1){//present and accurate
        return `<div class="present-accurate">${char}</div>`
    }else{ //present but not in correct position
        return `<div class="present">${char}</div>`
    }

}
function restartGame(){
    selectedWord = findRandomWord()
    selectedWordArray = Array.from(selectedWord)
    msg.innerText="Start Guessing"
    for (let row = 1; row<=noOfWordsSubmitted; row++) {
        let rowNode = document.querySelector(`.row-${row}`)
        let rowChild = rowNode.children;
        for (let col = 0; col < 5;col++) {
            rowChild[col].innerHTML="";
        }
    }
    noOfWordsSubmitted = 0
}