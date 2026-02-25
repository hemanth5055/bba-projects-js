const password=document.querySelector("#password")
const length=document.querySelector("#length")
const checkNumber=document.querySelector("#numbers")
const checkLetter=document.querySelector("#letters")
const checkMixed=document.querySelector("#mixed-case")
const checkPunctuation=document.querySelector("#punctuations")
const copy=document.querySelector(".copy")
const currentLength=document.querySelector(".current-length")
const notification = document.querySelector(".notification")
const checkBoxes = document.querySelectorAll(".check-boxes")

let lenthOfPassword = 9;

const punctuations = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
const numbers = "0123456789"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const upperCase = lowerCase.toUpperCase()


length.addEventListener('input',(e)=>{
    lenthOfPassword=Number(e.target.value)
    updateCurrentLength();
    handlePasswordCreation()
})

copy.addEventListener('click',()=>{
    if(password.value.length>0){
        navigator.clipboard.writeText(password.value);
        makePopupForCopyClipboard()
    }
})

checkBoxes.forEach((cb)=>{
    cb.addEventListener("click",()=>{
        handlePasswordCreation()
    })
})

function updateCurrentLength(){
    currentLength.innerText = lenthOfPassword
}
function handlePasswordCreation(){
    let temp = ""
    if(checkNumber.checked)temp+=numbers
    if(checkLetter.checked)temp+=lowerCase
    if(checkMixed.checked)temp+=upperCase
    if(checkPunctuation.checked)temp+=punctuations
    if(temp.length==0){
        makePopupForNoOptionsSelected();
        return;
    }
    let generatedPassword = getNewpassword(temp)
    password.value = generatedPassword;
}

function getNewpassword(corpus){
    let min = 0;
    let max = corpus.length
    let temp =""
    for (let i = 0; i < lenthOfPassword; i++) {
        temp+=corpus[Math.floor(Math.random()*(max-min)+min)]
    }
    return temp;
}
function makePopupForNoOptionsSelected(){
    const alreadyExist = document.querySelector(".no-option-error")!==null
    if(alreadyExist) return;
    const div = document.createElement('div')
    div.innerHTML=`<p>Please select at least one checkbox to generate a password.</p>`
    div.classList.add("no-option-error")
    notification.appendChild(div)
    setTimeout(() => {
        clearPopupForNoOptionsSelected()
    }, 3000);

}
function clearPopupForNoOptionsSelected(){
    const tobeRemoved = document.querySelector(".no-option-error")
    if(tobeRemoved!==null){
        tobeRemoved.remove()
    }
}
function makePopupForCopyClipboard(){
    const alreadyExist = document.querySelector(".no-option-error")!==null
    if(alreadyExist) return;
    const div = document.createElement('div')
    div.innerHTML=`<p>Password copied to clipboard</p>`
    div.classList.add("copy-password-success")
    notification.appendChild(div)
    setTimeout(() => {
        clearPopupForCopyClipboard()
    }, 3000);

}
function clearPopupForCopyClipboard(){
    const tobeRemoved = document.querySelector(".copy-password-success")
    if(tobeRemoved!==null){
        tobeRemoved.remove()
    }
}