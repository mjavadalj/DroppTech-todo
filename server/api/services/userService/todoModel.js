const { DataTypes } = require("sequelize");
const DBService = require("../DBService");
const sequelize = DBService.sequelize;

const Todo = sequelize.define(
	"Todo",
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
	},
	{
		// Other model options go here
	}
);

module.exports = Todo;