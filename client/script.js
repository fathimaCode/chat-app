const wss = new WebSocket(`ws://${window.location.host}`);
const login_container = document.getElementById("login_container");
const loginBtnId = document.getElementById("loginBtn");
const spanId = document.getElementById("spanId");
const messageInput = document.getElementById("input_message");
const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("sendBtn");
const message_display = document.getElementById("message_display");

wss.onopen = () => {
    console.log("WebSocket is connected");
};

wss.onclose = () => {
    console.log("WebSocket is closed");
};

wss.onmessage = (messageEvent) => {
    const messageContent = document.createElement("div");
    console.log(`Received message: ${messageEvent.data}`);
    
    try {
        const parsedMessage = JSON.parse(messageEvent.data);
        const blob = new Blob([parsedMessage]);

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            messageContent.textContent = reader.result;
            message_display.appendChild(messageContent);
        };
        reader.readAsText(blob);
    } catch (error) {
        console.error(`Error parsing message: ${error}`);
    }
};

wss.onerror = (error) => {
    console.log(`Error occurred: ${error.message}`);
};

sendBtn.addEventListener("click", () => {
    if (wss.readyState === WebSocket.OPEN) {
        const inputMessage = messageInput.value;
        const user = localStorage.getItem("username");
        const msg = JSON.stringify({ user: user, message: inputMessage });
        wss.send(msg);
        messageInput.value = "";
    } else {
        console.log("WebSocket is not open.");
    }
});

loginBtnId.addEventListener("click", () => {
    console.log("Login button clicked");
    loginBtnId.classList.add("btn_scroll");
    spanId.style.display = "none";
    localStorage.setItem("username", usernameInput.value);

    setTimeout(() => {
        login_container.style.display = "none";
    }, 300);
});
