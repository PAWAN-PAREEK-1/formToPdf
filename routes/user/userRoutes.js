const express = require('express');
const { login, submitHealthForm, getUser } = require('../../controller/userController');
const validate = require('../../middelware/tokenValidation');

const router = express.Router()

router.route("/").post(login)
router.route("/").get(validate , getUser)
router.route("/submit").post(submitHealthForm)



module.exports = router