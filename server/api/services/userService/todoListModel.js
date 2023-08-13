const { DataTypes } = require("sequelize");
const DBService = require("../DBService");
const sequelize = DBService.sequelize;

const TodoList = sequelize.define(
	"TodoList",
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
	}
);

module.exports = TodoList;
