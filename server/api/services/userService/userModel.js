const { DataTypes } = require("sequelize");
const DBService = require("../DBService");
const sequelize = DBService.sequelize;

const User = sequelize.define(
	"User",
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
	}
);

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = User;
