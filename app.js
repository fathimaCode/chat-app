const express = require("express");
const WebSocket = require("ws");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3000;
const app  = express();
const server = http.createServer(app);

const clients = []

app.use(express.static(path.join(__dirname,"client")));
const mywebSocket = new WebSocket.Server({server});
const chatList = []
mywebSocket.on('connection',(ws)=>{
    clients.push(ws)
    
  
   
    ws.on("message",(message)=>{
        clients.forEach((client,index)=>{
           
     
            if ( client.readyState === WebSocket.OPEN) {
               
                console.log(`this is the index ${index+1}, ${client._socket.remotePort}, ${message}`)
                var data = {
                        index:index+1,
                        port:client._socket.remotePort,
                        lastMessage:message

                }
                client.send(JSON.stringify(data));
              
              
            }
        })
    })
    ws.on("close", ()=>{
        const index = clients.indexOf(ws)
        if (index>-1){
         clients.splice(index,1)
        }
 
     })
    ws.send("welcome to my websocket chat");
})

mywebSocket.on('error', (error) => {
    console.error('WebSocket Server Error:', error);
});

server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})