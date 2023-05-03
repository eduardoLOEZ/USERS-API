const User = require("../../model/User")
const { decoded_token } = require("../../helpers/jwt")
const mongoose = require("mongoose")
const { validateToUpdate } = require("../../middlewares/validate_login")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")


//actualizar un usuario
const update_user = async (req, res) => {
    try {
        // Ejecutamos las validaciones una tras otra 
        for (let i = 0; i < validateToUpdate.length; i++) {
            await validateToUpdate[i].run(req);
        }

        // Si hay errores de validación, los manejamos aquí
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const token = req.headers.authorization.split(" ")[1];
        const { id } = decoded_token(token);
        const userId = new mongoose.Types.ObjectId(id);


        // Verificar que el usuario que intenta actualizar sus datos es el mismo que el ID del token
        //para que no cualquier usuario pueda actualizar tus datos
        //si un usuario introduce tu id, pero el coloca su token, vera que no coincide el id del token con el de request
        if (req.body.id !== userId.toString()) {
            return res.status(400).json({ msg: 'No tienes autorización para actualizar este usuario' });
        }

        const { username, password } = req.body
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {username, password: await bcrypt.hash(password,10)},
            {new: true}
        )

        if (!updatedUser) {
            return res.status(404).json({ msg: 'No se pudo actualizar el usuario' });
        }

        return res.status(201).json({
            user: updatedUser,
            msg: 'Usuario actualizado exitosamente',
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Ocurrió un error al actualizar el usuario' });

    }
}

module.exports = { update_user }