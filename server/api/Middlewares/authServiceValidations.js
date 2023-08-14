const { check, validationResult } = require("express-validator");

// const { validationResult } = require("express-validator");
exports.signUp = [
	check("user.name")
		.notEmpty()
		.withMessage("name is empty")
		.isString()
		.withMessage("name must be String")
		.isLength({
			min: 3,
			max: 50,
		})
		.withMessage("name must between 3 and 50 characters"),
	check("user.password")
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
exports.validatorCheck = (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(400).json({ err });
	} else {
		return;
	}
};
