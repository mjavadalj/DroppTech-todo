require("dotenv").config({
	path: "./server/.env",
});

const { Strategy, ExtractJwt } = require("passport-jwt");
const DBService = require("./DBService");

module.exports.applyPassportStrategy = (passport) => {
	const options = {};
	options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	options.secretOrKey = process.env.PASSPORT_SECRET;

	passport.use(
		new Strategy(options, async (payload, done) => {
			const foundedUser = await DBService.findUserByName(payload.name);
			if (foundedUser == null) {
				return done(null, false);
			} else {
				return done(null, {
					name: foundedUser.name,
				});
			}
			// return done(null, false);
		})
	);
};
// module.exports = applyPassportStrategy;
