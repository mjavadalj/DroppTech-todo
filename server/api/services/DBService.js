require("dotenv").config({
	path: "./server/.env",
});

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DBNAME}`
);
var User;
var TodoList;
var Todo;

const DBConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

const BuildRelations = () => {
	User = require("./userService/userModel");
	TodoList = require("./userService/todoListModel");
	Todo = require("./userService/todoModel");

	User.hasOne(TodoList, {
		foreignKey: "username",
		as: "User",
		onDelete: "CASCADE",
	});
	TodoList.belongsTo(User, { onDelete: "CASCADE" });
	TodoList.hasMany(Todo, {
		foreignKey: "listID",
		constraints: true,
		foreignKeyConstraint: true,
		onDelete: "CASCADE",
		as: "Tasks",
	});
	Todo.belongsTo(TodoList, {
		constraints: true,
		foreignKeyConstraint: true,
		onDelete: "CASCADE",
	});

	sequelize.sync({ force: true });
};

const AddUser = async (user) => {
	const addedUser = await User.create(user);
	if (addedUser != null) {
		const newTodoList = await AddTodoList(user);
		if (newTodoList != null) {
			let updateObject = { todoList: newTodoList.id };

			const updatedUser = await UpdateUser(addedUser, updateObject);
			return updatedUser;
		}
	}
	return { status: 500 };
};

const UpdateUser = async (user, updateObject) => {
	const newUser = await User.update(updateObject, {
		where: { name: user.name },
		returning: true,
	});

	// const
	return newUser;
};
const AddTodoList = async (user) => {
	const newList = await TodoList.create({ username: user.name });

	return newList;
};

const getAll = async () => {
	const usersr = await TodoList.findAll({});
};
const findUserByName = async (username) => {
	const foundedUser = await User.findOne({ where: { name: username } });
	return foundedUser;
};
const addTodo = async (username, todo) => {
	const foundedList = await TodoList.findOne({ where: { username } });
	if (foundedList == null) {
		return { status: 400 }; //TODO
	}
	todo.listID = foundedList.id;
	let newTodo = await Todo.create(todo);
	if (newTodo == null) {
		return { status: 400 }; //TODO
	}
	const updatedList = await TodoList.update(
		{
			todos: sequelize.fn("array_append", sequelize.col("todos"), newTodo.id),
		},
		{ where: { id: foundedList.id } }
	);

	if (updatedList == null) {
		return { status: 400 }; //TODO
	}

	return newTodo;
};
const getTodo = async (user, todoID) => {
	const foundedTodo = await Todo.findOne({ where: { id: todoID } });
	//const foundedList = await TodoList.findOne({where:{name:user.name}})
	if (foundedTodo == null) {
		return { status: 400 };
	}
	return foundedTodo;
};
const getAllTodos = async (user, orderField, orderCondition) => {
	const foundedTodoList = await TodoList.findOne({
		where: { username: user.name },
		include: [{ association: "Tasks" }],
		// order: [[{ association: "Tasks", as: "todos" }, "id", "DESC"]],
	});

	// return foundedTodoList.Tasks;
	return orderTodos(foundedTodoList.Tasks, orderField, orderCondition);
};
const orderTodos = (todos, orderBy, cond) => {
	let result;
	if (orderBy == "none") return todos;
	if (orderBy == "priority" && cond == "DESC") {
		result = todos.sort((a, b) => b.priority - a.priority);
	}
	if (orderBy == "priority" && cond == "ASC") {
		result = todos.sort((a, b) => a.priority - b.priority);
	}
	if (orderBy == "date" && cond == "DESC") {
		result = todos.sort((a, b) => new Date(b.date) - new Date(a.priority));
	}
	if (orderBy == "date" && cond == "ASC") {
		result = todos.sort((a, b) => new Date(a.date) - new Date(b.priority));
	}
	return result;
};
const changeTodoStatus = async (todoID, status) => {
	const result = await Todo.update({ status }, { where: { id: todoID }, returning: true });
	return result;
};
const getFilteredTodos = async (user, filterBy, filterValue) => {
	let result;
	if (filterBy == "priority") {
		result = await TodoList.findOne({
			where: {
				username: user.name,
			},
			include: [
				{
					association: "Tasks",
					as: "Tasks",
					where: {
						priority: filterValue,
					},
				},
			],
		});
	}
	if (filterBy == "date") {
		result = await TodoList.findOne({
			where: {
				username: user.name,
			},
			include: [
				{
					association: "Tasks",
					as: "Tasks",
					where: {
						date: filterValue,
					},
				},
			],
		});
	}

	if (filterBy == "status") {
		result = await TodoList.findOne({
			where: {
				username: user.name,
			},
			include: [
				{
					association: "Tasks",
					as: "Tasks",
					where: {
						status: filterValue,
					},
				},
			],
		});
	}
	return result.Tasks;
};
module.exports = {
	DBConnection,
	AddUser,
	BuildRelations,
	findUserByName,
	getAll,
	AddTodoList,
	addTodo,
	getTodo,
	getAllTodos,
	changeTodoStatus,
	getFilteredTodos,
	sequelize,
};
