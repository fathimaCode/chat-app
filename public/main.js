const clientTotal = document.getElementById("clientTotal")
const message = document.getElementById("message")
const btnSend = document.getElementById("btnSend")



const socket = io()

socket.on('total_client',(data)=>{
    clientTotal.innerText = `Total Users: ${data}`
})
btnSend.addEventListener("click",()=>{
    console.log(message.value)
    const data = {
        name:"name",
        message:message.value,
        dateTime:new Date()
    }
    socket.emit('message',data)
})

socket.on('chat-message',(data)=>{
    console.log(data.message)
})