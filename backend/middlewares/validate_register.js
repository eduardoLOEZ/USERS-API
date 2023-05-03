const { body } = require('express-validator');

const validate_user = [
  body('username').not().isEmpty().trim(),
  body('password').isLength({ min: 5 }).withMessage("la contraseña debe de tener mas de 5 caracteres ")
];

module.exports = { validate_user };