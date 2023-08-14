const { check } = require("express-validator");

exports.signUp = [
	check("todo.name")
		.notEmpty()
		.withMessage("name is empty")
		.isString()
		.withMessage("name must be String")
		.isLength({
			min: 3,
			max: 50,
		})
		.withMessage("name must between 3 and 50 characters"),
	check("todo.password")
		.notEmpty()
		.withMessage("password is empty")
		.isString()
		.withMessage("password must be string")
		.isLength({
			min: 3,
			max: 50,
		})
		.withMessage("password must between 3 and 50 characters"),
];

exports.login = [
	check("user.name")
		.notEmpty()
		.withMessage("name is empty")
		.isString()
		.withMessage("name must be string"),

	check("user.password")
		.notEmpty()
		.withMessage("password is empty")
		.isString()
		.withMessage("password must be string"),
];
