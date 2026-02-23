const notesArea = document.querySelector(".notes-area")
const noteInp = document.querySelector("#note-inp")
const add = document.querySelector(".add")

add.addEventListener("click",()=>{
    const task = (noteInp.value).trim();
    if(task!==""){
        //create a note an append
        const div = document.createElement("div")
        div.classList.add("note")

        const closeDiv = document.createElement("div")
        closeDiv.classList.add("close-area")

        const close = document.createElement("div")
        close.classList.add("remove")
        close.innerText="x"

        closeDiv.appendChild(close)

        const noteText = document.createElement("p")
        noteText.innerText=task;
        
        div.append(closeDiv)
        div.append(noteText)

        close.addEventListener("click",(event)=>{
            event.target.parentElement.parentElement.remove()
        })

        notesArea.appendChild(div)
        noteInp.value=""
    }

})

