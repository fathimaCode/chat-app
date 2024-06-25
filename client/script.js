const wss =new WebSocket(`ws://${window.location.host}`)
const login_container = document.getElementById("login_container")
const loginBtnId = document.getElementById("loginBtn")
const spanId = document.getElementById("spanId")
const message = document.getElementById("input_message")
const username = document.getElementById("username")
const sendBtn = document.getElementById("sendBtn")
const message_display = document.getElementById("message_display")

wss.onopen = ()=>{
console.log("web socket is connected")
}
wss.onclose= ()=>{
    console.log("web socket is closed")
}
wss.onmessage = (messageEvent) => {
    const messageContent = document.createElement("div");
    console.log(`Received message: ${messageEvent.data}`);
  
};

wss.onerror= (error)=>{
    console.log(`Error occured ${error}`)
}


sendBtn.addEventListener("click",()=>{
    if (wss.readyState === WebSocket.OPEN) {
        var inputMessage = message.value;
        const user = localStorage.getItem("username")
        const msg = {"user":user, "message":inputMessage}
        wss.send(msg);
        message.value = "";
    } else {
        console.log("WebSocket is not open.");
    }
})

users = []

loginBtnId.addEventListener("click",()=>{
    console.log("clicked")
    loginBtnId.classList.add("btn_scroll")
    spanId.style.display= "none"
    localStorage.setItem("username",username.value)
    
    setInterval(()=>{
        login_container.style.display ="none"
    },300)


})