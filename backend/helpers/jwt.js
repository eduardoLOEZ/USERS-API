require("dotenv").config()
const jwt  = require("jsonwebtoken")

const generate_token = (id,username)=>{
    try {
        const token  = jwt.sign({id: id, username: username}, process.env.SECRET, {expiresIn:60*10})
        return token
    } catch (error) {
        console.log(error)
        
    }


}

const decoded_token = (token) =>{
    try {
        const decoded = jwt.verify(token, process.env.SECRET,{
            algorithms: ['HS256'], // especificar el algoritmo de firma utilizado
            ignoreExpiration: false, // verificar la caducidad del token
        });
        return decoded
    } catch (error) {
        throw new Error("token invalido o expirado")
    }
}


module.exports = { generate_token, decoded_token }