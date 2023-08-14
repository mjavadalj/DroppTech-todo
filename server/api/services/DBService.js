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
	TodoList.hasMany(Todo, { foreignKey: "id", as: "List", onDelete: "CASCADE" });

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
	const newUser = await User.update(updateObject, { where: { name: user.name } });

	// const
	return newUser;
};
const AddTodoList = async (user) => {
	const newList = await TodoList.create({ username: user.name });

	// const lg = await TodoList.findOne({
	// 	where: { username: user.name },
	// 	include: "User",
	// });
	// console.log("***", lg);
	return newList;
};

const getAll = async () => {
	const usersr = await TodoList.findAll({});
	console.log(usersr);
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
	const newTodo = await Todo.create(todo);
	if (newTodo == null) {
		return { status: 400 }; //TODO
	}

	const updatedList = await TodoList.update(
		{ todos: sequelize.fn("array_append", sequelize.col("todos"), newTodo.id) },
		{ where: { id: foundedList.id } }
	);

	if (updatedList == null) {
		return { status: 400 }; //TODO
	}

	return newTodo;
};
module.exports = {
	DBConnection,
	AddUser,
	BuildRelations,
	findUserByName,
	getAll,
	AddTodoList,
	addTodo,
	sequelize,
};
