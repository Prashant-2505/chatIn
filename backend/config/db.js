const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongo is connected")
    } catch (error) {
        console.log("Connection error of mongoose: " + error)
        process.exit
    }
}

module.exports  =  connectDB