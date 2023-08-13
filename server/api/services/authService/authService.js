const DBService = require("../DBService");
const argon2 = require("argon2");
class AuthService {
	async signUp(user) {
		const foundedUsers = await DBService.findUserByName(user.name);
		if (foundedUsers != null) {
			return { status: 400 };
		}

		let hashedPassword = await argon2.hash(user.password);
		if (hashedPassword != null) {
			user.password = hashedPassword;
			const addedUser = await DBService.AddUser(user);
			if (addedUser != null) {
				return { status: 200, addedUser };
			}
		} else {
			return { status: 500 };
		}
	}
}

module.exports = AuthService;
