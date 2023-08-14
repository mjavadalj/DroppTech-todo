const router = require("express").Router();
const authController = require("./authController");
const DBService = require("../DBService");
const jwt = require("jsonwebtoken");
const passport = require("passport");
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/test", passport.authenticate("jwt", { session: false }), () => {
	console.log("*********************************");
	DBService.getAll();
});
module.exports = router;
