const router = require("express").Router();
const userController = require("./userController");
const DBService = require("../DBService");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/addTodo", passport.authenticate("jwt", { session: false }), userController.addTodo);
router.post("/getTodo", passport.authenticate("jwt", { session: false }), userController.getTodo);
router.post(
	"/getAllTodos",
	passport.authenticate("jwt", { session: false }),
	userController.getAllTodos
);
router.post(
	"/changeTodoStatus",
	passport.authenticate("jwt", { session: false }),
	userController.changeTodoStatus
);
router.post(
	"/getFilteredTodos",
	passport.authenticate("jwt", { session: false }),
	userController.getFilteredTodos
);
module.exports = router;
