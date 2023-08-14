const router = require("express").Router();
const authController = require("./authController");
const DBService = require("../DBService");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validation = require("../../Middlewares/authServiceValidations");

router.post("/signup", validation.signUp, authController.signUp);
router.post("/login", validation.login, authController.login);
module.exports = router;
