const router = require("express").Router();
const authRoutes = require("./api/services/authService/authRoutes");
const userRoutes = require("./api/services/userService/userRoutes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
