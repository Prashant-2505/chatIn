const dotenv = require('dotenv');
const express = require('express');

const app = express()
dotenv.config()




app.get('/', (req, res) => {
    res.send("api is running" )
})

app.get('/api/chat', (req, res) => {
    console.log("all chats")
})

app.get('/api/chat/:id', (req, res) => {
    console.log(req)
})





const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log("server is running at " + PORT)
})