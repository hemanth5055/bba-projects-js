const fromCurrency = document.getElementById("from-currency")
const toCurrency = document.getElementById("to-currency")
const submit = document.getElementById("submit")
const amount = document.getElementById("amount")
const msg = document.querySelector(".msg")
const API_KEY="a6e5fc65c583bf96f4c24c90"

const COUNTRIES_API="https://restcountries.com/v3.1/all?fields=currencies,flag"

populateOptions()
submit.addEventListener("click",handleConvert)

async function populateOptions(){
    try {
        const response = await fetch(COUNTRIES_API)
        if(!response.ok) throw new Error("There is an Error");
        
        const data = await response.json();
        createHtmlAndUpdateOptions(data)
    } catch (error) {
        console.log(error)
    }
}
function createHtmlAndUpdateOptions(data){
    let html = ""
    const nonDuplicateCurrencies = new Set();
    data.forEach(({currencies,flag}) => {
        let tempCurrencies = Object.keys(currencies);
        if(tempCurrencies.length!==0){
        let code = tempCurrencies[0];
        let name = capitalizeFirstLetter(currencies[tempCurrencies[0]].name)
        html+=`<option value="${code}">${flag} - ${code} - ${name}</option>`
        }
    });
    fromCurrency.innerHTML=html
    toCurrency.innerHTML=html
    fromCurrency.children[10].selected=true //USD
    toCurrency.children[169].selected=true //INR
}
function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
async function handleConvert(){
    const from = fromCurrency.value
    const to = toCurrency.value
    updateMessage(`Converting ${from} to ${to}`)
    const val = amount.value;
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`)
        const data = await response.json()
        // console.log(data)
        if(data.result!=="success"){
            throw new Error("Something went wrong!");
        }
        const multiplier = data.conversion_rates[to]
        if (multiplier===null) {
            throw new Error("Data Unavailable");
        }
        // console.log(val)
        updateMessage(`${val} ${from} = ${val*multiplier} ${to}`)
    } catch (error) {
        updateMessage(error.message)
    }
}
function updateMessage(message){
    msg.innerText = message;    
}




