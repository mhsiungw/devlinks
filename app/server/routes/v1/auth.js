import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import db from '../../db/index.js';

const router = Router();

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, cb) => {
			try {
				const { rows } = await db.query(
					'SELECT * FROM users WHERE email = $1',
					[email],
				);
				if (!rows.length) {
					cb(null, false, {
						message: 'Incorrect username or password.',
					});
				}

				const { id, password: hashPassword } = rows[0];

				if (await bcrypt.compare(password, hashPassword)) {
					cb(null, { id, email });
				} else {
					cb(null, false, {
						message: 'Incorrect username or password.',
					});
				}
			} catch (err) {
				cb(err);
			}
		},
	),
);

passport.serializeUser((user, cb) => {
	process.nextTick(() => {
		cb(null, { id: user.id, email: user.email });
	});
});

passport.deserializeUser((user, cb) => {
	process.nextTick(() => {
		cb(null, user);
	});
});

router.post(
	'/login/password',
	passport.authenticate('local', {
		failureMessage: true,
		failWithError: true,
	}),
	(req, res) => {
		// handle success
		res.json({ message: 'ok', data: { id: req.user.id } });
	},
	// eslint-disable-next-line no-unused-vars
	(err, req, res, next) => {
		// Handle error
		res.status(401).json({ message: req.session.messages[0] });
	},
);

router.get('/logout', (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

router.post('/signup', async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
			email,
			hashedPassword,
		]);

		res.json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
});

export default router;
