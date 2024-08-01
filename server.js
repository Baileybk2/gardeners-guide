const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const plantListRouter = require("./controllers/plantList")
const usersRouter = require("./controllers/users")
const profilesRouter = require("./controllers/profiles")

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
app.use(cors({ origin: process.env.REACT_FRONT_END_URL }))
app.use(express.json())

// Routes go here
app.use("/users", usersRouter)
app.use("/profiles", profilesRouter)
app.use("/plantList", plantListRouter)

app.listen(3000, () => {
  console.log("The express app is ready!")
})
