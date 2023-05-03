const { body } = require('express-validator');

const validate_user_login = [
  body('username').not().isEmpty().trim(),
  body('password').isLength({ min: 6 })
];


const validateToUpdate = [
  body('username').isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
]

module.exports = { validate_user_login, validateToUpdate };