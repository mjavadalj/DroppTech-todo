const DBService = require("../DBService");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class UserService {
	async addTodo(req) {
		const result = await DBService.addTodo(req.user.name, req.body.todo);
		return { result, status: 200 };
	}
}

module.exports = UserService;
