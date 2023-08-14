const AuthService = require("./authService");
const Auth = new AuthService();

module.exports.signUp = async (req, res) => {
	const result = await Auth.signUp(req.body.user);
	if (result.status == 200) {
		return res.status(200).json({
			result,
		});
	}
	if (result.status == 400) {
		return res.status(400).json({
			message: "username already exists",
		});
	}
};
module.exports.login = async (req, res) => {
	const result = await Auth.login(req.body.user);
	return res.status(200).json({
		result,
	});
};
