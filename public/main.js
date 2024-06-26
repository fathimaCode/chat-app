const clientTotal = document.getElementById("clientTotal")
const message = document.getElementById("message")
const btnSend = document.getElementById("btnSend")
const username = document.getElementById("username")
const message_container = document.getElementById("message_container")
username.addEventListener('input',()=>{
    console.log(username.value)
})

const socket = io()

socket.on('total_client',(data)=>{
    clientTotal.innerText = `Total Users: ${data}`
})
btnSend.addEventListener("click",()=>{
    console.log(message.value)
    const data = {
        name:username.value,
        message:message.value,
        dateTime:new Date()
    }
    socket.emit('message',data)
    const clientDivElement = document.createElement('div');
  
    clientDivElement.innerText = message.value;
    message_container.appendChild(clientDivElement);
    message.value = ""
})

socket.on('chat-message',(data)=>{
    const senderElement = document.createElement('div')
    senderElement.innerText=data.name
    const divElement = document.createElement('div')
    divElement.innerText = data.message
    message_container.appendChild(divElement)
    message_container.appendChild(senderElement)
    console.log(data)
})