const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')


const app = express()
dotenv.config()
connectDB()

app.use(express.json())


app.get('/', (req, res) => {
    res.send("api is running" )
})

app.use('/api/user',userRoutes)




const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log("server is running at " + PORT)
})