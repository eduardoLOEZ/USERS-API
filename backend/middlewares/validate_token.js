require("dotenv").config()
const jwt = require("jsonwebtoken")

const require_token = (req,res,next) =>{
    try {
        let token = req.headers.authorization

        if(!token){
            throw new Error("No hay token en el header, no tienes acceso a esta ruta, usa Bearer")

        }

        token = token.split(" ")[1]
        const payload = jwt.verify(token, process.env.SECRET)

        console.log(payload)
        next()
    } catch (error) {
        return res.status(401).json({
            error: error.message
        })
        
    }
}

module.exports = { require_token }
