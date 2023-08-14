const { DataTypes } = require("sequelize");
const DBService = require("../DBService");
const sequelize = DBService.sequelize;

const Todo = sequelize.define("Todo", {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	listID: { type: DataTypes.INTEGER },
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	priority: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	status: {
		type: DataTypes.ENUM("OPEN", "CLOSED"),
		defaultValue: "OPEN",
	},
});

module.exports = Todo;
