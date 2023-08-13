require("dotenv").config({
	path: "./server/.env",
});

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DBNAME}`
);
var User;
var TodoList;

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

	User.hasOne(TodoList, { onDelete: "CASCADE" });
	TodoList.belongsTo(User, { onDelete: "CASCADE" });

	sequelize.sync({ force: true });
};
const AddUser = async (user) => {
	const addedUser = await User.create(user);

	return addedUser;
};
const findUserByName = async (username) => {
	console.log(username);
	const emp = await User.findAll({});
	console.log("all : ", emp);
	const foundedUser = await User.findOne({ where: { name: username } });
	console.log(foundedUser);
	return foundedUser;
};
module.exports = { DBConnection, AddUser, BuildRelations, findUserByName, sequelize };
