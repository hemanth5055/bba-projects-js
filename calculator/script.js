const inp = document.getElementById("inp")
const buttons = document.querySelectorAll(".btn")
const popup = document.querySelector(".popup")
//Main variables
let prev = null;
let operator = null;
let curr = "0";
let isLastInputAnOperator = false;
//Initial
updateInpBar(curr)
// console.log(prev,operator,curr)
// Functions
buttons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        const it = btn.innerText;
        if(isNaN(it)){
            //reset
            if(it==="C"){
                prev=null;
                operator=null;
                curr="0";
                isLastInputAnOperator=false;
            }else if(it==="Del"){
                if(curr!=="0"){
                    if(curr.length==1){
                        curr="0"
                    }else{
                        curr = curr.slice(0,curr.length-1)
                    }
                }
                isLastInputAnOperator=false;
            }else if(it==="="){
                //clear the prev and operator and show result
                if(operator!==null){
                    curr = applyMathOperation(prev,curr,operator)
                    prev = null;
                    operator=null
                }
                isLastInputAnOperator=false;
            }else if(it==="."){
                //will handle it later
                if((![...curr].includes('.'))){
                    curr = curr+it;
                }
                isLastInputAnOperator=false;
            }else{
                //We got an operator
                if(prev===null){//first operator -> No Operation
                    prev = curr;
                    operator = it
                    curr="0"
                }else{ //
                    if(isLastInputAnOperator){
                        //Just overide the operator
                        operator=it
                    }else{
                        prev = applyMathOperation(prev,curr,operator);
                        operator=it;
                        curr="0"
                    }
                }
                isLastInputAnOperator=true;
            }

        }else{
            if(curr==="0"||curr==="Infinity"){
                //We need to replace
                curr=it;
            }else{
                //we should append
                curr = curr+it;
            }
            isLastInputAnOperator = false;
        }
        // console.log(prev,operator,curr)
        updateInpBar(curr);
    })
})

function updateInpBar(txt){
    inp.innerText=txt;
}
function applyMathOperation(prev,curr,operator){
    let val = 0;
    let a = parseFloat(prev)
    let b = parseFloat(curr)
    switch(operator){
        case "+":
            val = a+b;
            break; 
        case "-":
            val = a-b;
            break; 
        case "x":
            val = a*b;
            break; 
        case "/":
            val = a/b;
            break; 
        case "%":
            val = a%b;
            break; 
        case "Exp":
            val = a**b;
            break; 
        default:
            val=0;
            break;
    }
    return String(val)
}
function showPopup(){
    popup.show();
    setTimeout(() => {
        popup.close();
    }, 2000);
}