const { DataTypes } = require("sequelize");
const DBService = require("../../DBService");
const sequelize = DBService.sequelize;

const User = sequelize.define(
	"User",
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true },
		name: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		todoList: {
			type: DataTypes.INTEGER,
		},
	},
	{
		// Other model options go here
	}
);

module.exports = User;
