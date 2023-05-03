const express = require("express")
const router = express.Router()
const { viewProfile } = require("./view-profile")
const { require_token } = require("../../middlewares/validate_token")
const { update_user } = require("./update_user")

const profile = router


//rutas
profile.get("/", require_token ,viewProfile)
profile.put("/update", require_token, update_user)

module.exports = profile
