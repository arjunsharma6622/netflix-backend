const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./utils/connectDB")

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")
const genreRoute = require("./routes/genre")

const cors = require("cors")
const corsOptions = {
    origin : ["http://localhost:5173", "http://localhost:5174", "https://movix-admin.vercel.app", "https://movix-client.vercel.app"],
    withCredentials : true,
    optionSuccessStatus : 200,
}
  
app.use(cors(corsOptions))

dotenv.config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/genre", genreRoute);

connectDB(DB_URL);

app.get("/", (req, res) => {
    res.send({
        name: "Arjun Sharma",
        greeting: "Hello 👋👋",
        description: "Welcome to the MOVIX BACKEND"
    })
})

app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`)
})