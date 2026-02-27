const search = document.getElementById("search")
let query = ""

const taskInp = document.getElementById("task")
const taskDate = document.getElementById("date")
const taskTime = document.getElementById("time")
const addBtn = document.querySelector(".submit")
const popUp = document.querySelector(".pop-up-area")
const closePopup = document.querySelector(".ok")

const tasks = document.querySelector(".tasks")

let currTasks = getTasksFromLocalStorage()
RenderUi()

function updateLocalStorage(){
    localStorage.setItem('localTask',JSON.stringify(currTasks))
}
function getTasksFromLocalStorage(){
    let isThere = localStorage.getItem("localTask");
    if(isThere===null){
        return [];
    }
    return JSON.parse(isThere)
}

addBtn.addEventListener("click",()=>{
    const _taskName = taskInp.value;
    const _taskDate = taskDate.value;
    const _taskTime = taskTime.value;
    if(_taskName!=="" && _taskDate!=="" &&_taskTime!=="" ){
        currTasks.push({
            id:new Date().toISOString(),
            name:_taskName,
            date:_taskDate,
            time:_taskTime,
        })
        taskInp.value=""
        taskDate.value=""
        taskTime.value=""
        updateLocalStorage()
        RenderUi()
    }else{
        //show popup
        popUp.style.display="flex"
        console.log("Please fill all the fields")
    }
})

function RenderUi(){
    const regex = new RegExp(query,"ig")
    if(currTasks.length==0){
        tasks.innerHTML = '<p>No tasks</p>'
    }else{
        const html  = currTasks.reduce((acc,curr)=>{
                if(regex.test(curr.name)){
                    acc+=`<div class="task">
                            <div class="date-area">
                                <p class="task-date">${curr.date}</p>
                            </div>
                            <div class="details-area">
                                <p class="task-name">${curr.name} at <span>${curr.time}</span></p>
                                <div class="options-area">
                                    <button class="edit" data-id="${curr.id}">Edit</button>
                                    <button class="delete" data-id="${curr.id}" onClick="handleDelete(event)">Delete</button>
                                </div>
                            </div>
                        </div>`
                }
                return acc;
            },"")

    tasks.innerHTML=html    
    }
    
}

function handleDelete(e){
    currTasks = currTasks.filter((curr)=>e.currentTarget.dataset.id!==curr.id)
    updateLocalStorage()
    RenderUi()
}
search.addEventListener("input",(e)=>{
    query=e.target.value;
    console.log(query)
    RenderUi()
})

closePopup.addEventListener("click",()=>popUp.style.display="none")