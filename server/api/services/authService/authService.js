const DBService = require("../DBService");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
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
	async login(user) {
		// const {name , password} = user;
		const foundedUser = await DBService.findUserByName(user.name);
		if (foundedUser == null) {
			return { status: 400 };
		}
		if (!argon2.verify(foundedUser.password, user.password)) {
			if (foundedUser != null) {
				return { status: 400 };
			}
		}
		const token = jwt.sign({ name: user.name }, process.env.PASSPORT_SECRET, {
			expiresIn: process.env.PASSPORT_EXPIRE_TIMER,
		});
		return { ...{ foundedUser }, ...{ token } };
	}
}

module.exports = AuthService;
