const { check, validationResult } = require("express-validator");

exports.addTodo = [
	check("todo.title")
		.notEmpty()
		.withMessage("title is empty")
		.isString()
		.withMessage("title must be string"),
	check("todo.description").optional().isString().withMessage("description must be string"),
	check("todo.date")
		.notEmpty()
		.withMessage("date is empty")
		.isDate()
		.withMessage("date must be of type Date"),
	check("todo.status")
		.optional()
		.isIn(["OPEN", "CLOSE"])
		.withMessage("status must be either OPEN or CLOSE"),
];

exports.getTodo = [
	check("todoID")
		.notEmpty()
		.withMessage("todoID is empty")
		.isInt()
		.withMessage("todoID must be Int"),
];

exports.getAllTodos = [
	check("orderField")
		.notEmpty()
		.withMessage("orderField is empty")
		.isString()
		.withMessage("orderField must be string")
		.isIn(["priority", "date", "none"])
		.withMessage("orderField must be priority or date or none"),
	check("orderCondition")
		.notEmpty()
		.withMessage("orderCondition is empty")
		.isString()
		.withMessage("orderCondition must be string")
		.isIn(["ASC", "DESC"])
		.withMessage("orderField must be DESC or ASC"),
];

exports.changeTodoStatus = [
	check("todoID")
		.notEmpty()
		.withMessage("todoID is empty")
		.isInt()
		.withMessage("todoID must be Int"),
	check("status")
		.notEmpty()
		.withMessage("status is empty")
		.isString()
		.withMessage("status must be string")
		.isIn(["OPEN", "CLOSED"])
		.withMessage("status must be OPEN or CLOSE"),
];

exports.getFilteredTodos = [
	check("filterBy")
		.notEmpty()
		.withMessage("filterBy is empty")
		.isString()
		.withMessage("filterBy must be string")
		.isIn(["date", "priority", "status"])
		.withMessage("filterBy must be status or priority or date"),
	check("filterValue").notEmpty().withMessage("filterValue is empty"),
];

exports.validatorCheck = (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(400).json({ err });
	} else {
		return false;
	}
};
