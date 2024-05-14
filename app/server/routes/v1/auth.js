import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import db from '../../db/index.js';

const router = Router();

router.post(
	'/login/password',
	passport.authenticate('local', {
		failureMessage: true,
		failWithError: true
	}),
	async (req, res) => {
		const {
			rows: [{ profileId }]
		} = await db.query(
			`
			SELECT profile_id "profileId" FROM profiles
			WHERE user_id = $1
			`,
			[req.user.id]
		);

		// handle success
		return res.json({
			error: false,
			message: 'ok',
			data: { userId: req.user.id, profileId }
		});
	},
	// eslint-disable-next-line no-unused-vars
	(_, req, res, next) =>
		// Handle error
		res.status(401).json({
			error: true,
			message:
				process.env.mode === 'production'
					? 'Something went wrong'
					: req.session.messages[0],
			data: null
		})
);

router.get('/login/pin', async (req, res) => {
	res.json({
		error: false,
		message: 'ok',
		data: { isAuthenticated: req.isAuthenticated(), user: req.user }
	});
});

router.get('/logout', (req, res, next) => {
	req.logout(err => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

router.post('/signup', async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const {
			rows: [{ count }]
		} = await db.query(`SELECT COUNT(*) FROM users WHERE email = $1`, [
			email
		]);

		if (count >= 1) {
			return res.status(200).json({
				error: false,
				message: 'Email already in use',
				data: null
			});
		}

		const {
			rows: [{ profileId }]
		} = await db.query(
			`
				WITH inserted_user AS (
					INSERT INTO users (email, password)
					VALUES ($1, $2)
					RETURNING user_id AS user_id
				)
				INSERT INTO profiles (user_id)
				VALUES ((SELECT user_id FROM inserted_user))
				RETURNING profile_id AS profileId;
			`,
			[email, await bcrypt.hash(password, 10)]
		);

		res.json({
			error: false,
			message: 'User has been created!',
			data: { profileId }
		});
	} catch (err) {
		next(err);
	}
});

export default router;
