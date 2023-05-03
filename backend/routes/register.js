const { body, check, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const User = require("../model/User")
const { validate_user } = require("../middlewares/validate_register")
const { validate_user_login } = require("../middlewares/validate_login")
const { generate_token, decoded_token } = require("../helpers/jwt")


//registrar un usuario en la db
const register = async (req, res) => {

    try {
        // Ejecutamos las validaciones una tras otra 
        for (let i = 0; i < validate_user.length; i++) {
            await validate_user[i].run(req);
        }

        // Si hay errores de validación, los manejamos aquí
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body

        if (!(password && username)) {
            return res.status(400).send({ message: "no colocaste los datos de manera correcta o ninguno" });
        }

        const maybeUser = await User.findOne({ username });
        if (maybeUser) {
            throw new Error('username already in use');
        }
        //encriptar password para seguridad 
        const encryptedPassword = await bcrypt.hash(password, 10)

        //guardar la password que sera encriptada en la db
        const user = await User.create({ username, password: encryptedPassword });

        return res.status(201).json({ msg: "usuario creado exitosamente", username: user.username, createdAt: user.createdAt });


    } catch (error) {
        console.error(`[signIn]: ${error}`);

        return res.status(500).json({
            error: 'An unexpected error happened. Please try again later',
        });

    }



}


//iniciar sesion y autenticar si el usuario existe en la db
const login = async (req, res) => {

    try {
        // Ejecutamos las validaciones una tras otra 
        for (let i = 0; i < validate_user_login.length; i++) {
            await validate_user_login[i].run(req);
        }

        // Si hay errores de validación, los manejamos aquí
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { username, password } = req.body;


        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                error: 'username or password is incorrect',
            });
        }

        const isPasswordValidate = bcrypt.compareSync(password, user.password)

        if (!isPasswordValidate) {
            return res.status(400).json({
              error: 'username or password is incorrect',
            });
        }

        //token 
        const token = generate_token({
            id: user.id,
            username: user.username
        })

        return res.status(201).json({ msg: "inicio de sesion exitosa",token, username: user.username, id: user.id});

    } catch (error) {

    }

}


module.exports = { register, login }