const { DataTypes } = require("sequelize");
const DBService = require("../../DBService");
const sequelize = DBService.sequelize;

const TodoList = sequelize.define("TodoList", {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	todos: {
		type: DataTypes.ARRAY(DataTypes.INTEGER),
	},
});

module.exports = TodoList;
