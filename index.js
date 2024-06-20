const express = require('express')
const webSocket = require('ws')
const app = express()
const PORT = process.env.PORT || 3000

const wss = new webSocket.Server({port:8181})
wss.on('connection',(ws)=>{

    ws.on('message',(message)=>{
        console.log(`received message:  ${message}`)
    })
    ws.send('send message')
})

app.get('/',(req,res)=>{
    res.send("this is your first  chat app")
})

app.listen(PORT,()=>{
    console.log(`server running ${PORT}`)
})