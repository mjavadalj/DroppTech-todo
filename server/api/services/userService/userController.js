const UserService = require("./userService");
const User = new UserService();

module.exports.addTodo = async (req, res) => {
	const result = await User.addTodo(req);
	if (result.status == 200) {
		return res.status(200).json({
			result,
		});
	}
};
module.exports.getTodo = async (req, res) => {
	const result = await User.getTodo(req);
	// if (result.status == 200) {
	return res.status(200).json({
		result: result.result,
	});
	// }
};
module.exports.getAllTodos = async (req, res) => {
	const result = await User.getAllTodos(req);
	return res.status(200).json({
		result: result.result,
	});
};
module.exports.changeTodoStatus = async (req, res) => {
	const result = await User.changeTodoStatus(req);
	return res.status(200).json({
		result: result.result,
	});
};

module.exports.getFilteredTodos = async (req, res) => {
	const result = await User.getFilteredTodos(req);
	return res.status(200).json({
		result: result,
	});
};
