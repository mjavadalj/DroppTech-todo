const DBService = require("../DBService");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class UserService {
	async addTodo(req) {
		const result = await DBService.addTodo(req.user.name, req.body.todo);
		return { result, status: 200 };
	}
	async getTodo(req) {
		const result = await DBService.getTodo(req.user, req.body.todoID);
		return { result, status: 200 };
	}
	async getAllTodos(req) {
		const result = await DBService.getAllTodos(
			req.user,
			req.body.orderField,
			req.body.orderCondition
		);
		return { result, status: 200 };
	}
	async changeTodoStatus(req) {
		const result = await DBService.changeTodoStatus(req.body.todoID, req.body.status);
		return { result, status: 200 };
	}
	async getFilteredTodos(req) {
		const result = await DBService.getFilteredTodos(
			req.user,
			req.body.filterBy,
			req.body.filterValue
		);
		return { result, status: 200 };
	}
}

module.exports = UserService;
