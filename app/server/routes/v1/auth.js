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
	(req, res) => {
		// handle success
		res.json({ message: 'ok', data: { id: req.user.id } });
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

		await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
			email,
			hashedPassword
		]);

		res.json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
});

export default router;
