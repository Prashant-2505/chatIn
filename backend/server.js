const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')

const cors = require('cors');


const app = express()
app.use(cors());
dotenv.config()
connectDB()

app.use(express.json())


app.get('/', (req, res) => {
    res.send("api is running" )
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)







const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log("server is running at " + PORT)
})