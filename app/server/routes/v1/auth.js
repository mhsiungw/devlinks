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
		res.json({ message: 'ok', data: { userId: req.user.id, profileId } });
	},
	// eslint-disable-next-line no-unused-vars
	(err, req, res, next) => {
		// Handle error
		res.status(401).json({ message: req.session.messages[0] });
	}
);

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
		const hashedPassword = await bcrypt.hash(password, 10);

		// TODO: add transition
		const {
			rows: [{ userId }]
		} = await db.query(
			`
				INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id AS "userId"
			`,
			[email, hashedPassword]
		);

		const {
			rows: [{ profileId }]
		} = await db.query(
			`INSERT INTO profiles (user_id) VALUES ($1) RETURNING profile_id AS "profileId"`,
			[userId]
		);

		res.json({ message: 'ok', data: { profileId } });
	} catch (err) {
		next(err);
	}
});

export default router;
