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
