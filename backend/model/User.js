const mongoose = require("mongoose")
const Schema = mongoose.Schema

//documentacion de los datos con los que vamos a trabajar(username, password)
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: "nombre del usuario"
 *        password:
 *           type: string
 *           description: contraseña del usuario con un minimo de 6 caracteres
 *      required:
 *        - username
 *        - password
 *      example:
 *        username: eduardo
 *        password: tecnologia
 */





const Userschema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
      password: {
        type: String,
        minlength: 6,
        required: true,
      },
    },
    { timestamps: true }
)

module.exports= mongoose.model("User", Userschema)