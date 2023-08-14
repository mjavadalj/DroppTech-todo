const router = require("express").Router();
const userController = require("./userController");
const DBService = require("../DBService");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validation = require("../../Middlewares/userServiceValidations");

router.post(
	"/addTodo",
	passport.authenticate("jwt", { session: false }),
	validation.addTodo,
	userController.addTodo
);
router.post(
	"/getTodo",
	passport.authenticate("jwt", { session: false }),
	validation.getTodo,
	userController.getTodo
);
router.post(
	"/getAllTodos",
	passport.authenticate("jwt", { session: false }),
	validation.getAllTodos,
	userController.getAllTodos
);
router.post(
	"/changeTodoStatus",
	passport.authenticate("jwt", { session: false }),
	validation.changeTodoStatus,
	userController.changeTodoStatus
);
router.post(
	"/getFilteredTodos",
	passport.authenticate("jwt", { session: false }),
	validation.getFilteredTodos,
	userController.getFilteredTodos
);
module.exports = router;
