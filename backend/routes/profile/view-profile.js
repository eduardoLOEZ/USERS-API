const User = require("../../model/User")
const { decoded_token }= require("../../helpers/jwt")
const mongoose = require("mongoose")


//ver perfil de un usuario mediante un token
const viewProfile = async(req,res) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = decoded_token(token)
        const objectId = new mongoose.Types.ObjectId(id);
        const user = await User.findById(objectId)

        return res.status(200).json({
            msg: `Bienvenido ${user.username}`
        })
     } catch (error) {

        console.log(error)
        
    }
}

module.exports={ viewProfile }