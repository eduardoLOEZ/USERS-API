require("dotenv").config()
const mongoose = require("mongoose")

const db = ()=>{
    try {
        mongoose.connect(process.env.DB_URL)
        .then(() => { console.log("conectado a la db") })
        .catch(() => { console.log("error al conectar a la db") })
    } catch (error) {

        console.error(error)
        
    }
}

module.exports = { db }