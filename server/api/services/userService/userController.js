const UserService = require("./userService");
const User = new UserService();

const { validatorCheck } = require("../../Middlewares/userServiceValidations");
module.exports.addTodo = async (req, res) => {
	if (!validatorCheck(req, res)) {
		const result = await User.addTodo(req);
		if (result.status == 200) {
			return res.status(200).json({
				result,
			});
		}
	}
};
module.exports.getTodo = async (req, res) => {
	if (!validatorCheck(req, res)) {
		const result = await User.getTodo(req);
		return res.status(200).json({
			result: result.result,
		});
	}
};
module.exports.getAllTodos = async (req, res) => {
	if (!validatorCheck(req, res)) {
		const result = await User.getAllTodos(req);
		return res.status(200).json({
			result: result.result,
		});
	}
};
module.exports.changeTodoStatus = async (req, res) => {
	if (!validatorCheck(req, res)) {
		const result = await User.changeTodoStatus(req);
		return res.status(200).json({
			result: result.result,
		});
	}
};

module.exports.getFilteredTodos = async (req, res) => {
	if (!validatorCheck(req, res)) {
		var err = validationResult(req);
		if (!err.isEmpty()) {
			console.log(err.mapped());
			return res.status(400).json({ err });
		} else {
			// you pass req and res on to your controller

			const result = await User.getFilteredTodos(req);
			return res.status(200).json({
				result: result,
			});
		}
	}
};
