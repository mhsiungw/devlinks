import passport from 'passport';
import local from './local.js';

export default app => {
	app.use(passport.authenticate('session'));

	passport.serializeUser((user, cb) => {
		process.nextTick(() => {
			cb(null, {
				id: user.id,
				email: user.email,
				profileId: user.profileId
			});
		});
	});

	passport.deserializeUser((user, cb) => {
		process.nextTick(() => {
			cb(null, user);
		});
	});

	passport.use(local);
};
