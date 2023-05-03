require("dotenv").config()
const { app } = require("./app")
const { db }= require("./database")

db()

app.listen(process.env.PORT, ()=>[
    console.log("corriendo servidor")
])