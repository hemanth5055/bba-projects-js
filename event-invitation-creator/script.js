const errorDialog = document.querySelector(".all-required");
const closeBtn = document.querySelector(".close-error");
const invDialog = document.querySelector(".invitation")
const invCont = document.querySelector(".invitation-content")

closeBtn.addEventListener("click", (e) => {
    errorDialog.close(); 
}); 
invCont.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents the dialog from closing when clicking inside the white box
});
invDialog.addEventListener("click",(e)=>{
    invDialog.close()
})

const myForm = document.getElementById('myForm')
myForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const formData = new FormData(myForm);
    const eventName = formData.get('event-name')
    const eventDate = formData.get('event-date')
    const startTime = formData.get('start-time')
    const endTime = formData.get('end-time')
    const eventDesc = formData.get('event-desc')
    const location = formData.get('location')
    
    if (eventName === "" || eventDate === "" || startTime === "" || endTime === "" || eventDesc === "" || location === "") {
        errorDialog.show(); 
    } else {
        console.log("Form submitted successfully!");
        const html = createHtml(eventName,eventDate,startTime,endTime,eventDesc,location)
        invCont.innerHTML=html
        invDialog.show()
    }
    
})

function createHtml(eventName,eventDate,startTime,endTime,eventDesc,location){
    return `<div class="inv-heading-area">
                    <h1>YOU ARE INVITED</h1>
                    <h3>TO JOIN THE</h3>
                    <h2>${eventName}</h2>
                </div>
                <div class="inv-content-area">
                    <p class="date">${eventDate}</p>
                    <p class="time">${startTime} - ${endTime}</p>
                    <p class="location">${location}</p>
                    <p>${eventDesc}</p>
                </div>`
}