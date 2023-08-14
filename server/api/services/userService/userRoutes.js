const router = require("express").Router();
const userController = require("./userController");
const DBService = require("../DBService");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/addTodo", passport.authenticate("jwt", { session: false }), userController.addTodo);

module.exports = router;
