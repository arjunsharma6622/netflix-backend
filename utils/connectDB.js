const mongoose = require("mongoose")

//DB Connection
const connectDB = (DB_URL) => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("DB connected")
        })
        .catch((err) => {
            console.log("DB connection Error : " + err)
        })
}
module.exports = connectDB;