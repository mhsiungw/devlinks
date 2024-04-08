import { Router } from 'express';
import db from '../../db/index.js';

const router = Router();

router.get('/:profileId', async (req, res) => {
	const { profileId } = req.params;

	const { rows } = await db.query(
		`SELECT 
			profile_id "profileId",
			first_name "firstName",
			last_name "lastName",
			avatar_url "avatarUrl",
			email,
			links
		FROM profiles WHERE profile_id = $1`,
		[profileId]
	);

	res.json({ message: 'ok', data: rows[0] });
});

router.post('/', async (req, res, next) => {
	const userId = req?.user?.id;
	const { name, email, links } = req.body;

	try {
		await db.query(
			'INSERT INTO profiles (user_id, name, email, links) VALUES ($1, $2, $3, $4)',
			[userId, name, email, links]
		);
		res.json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
});

router.put('/:profileId', async (req, res, next) => {
	const userId = req?.user?.id;
	const { profileId } = req.params;

	try {
		const { rows } = await db.query(
			`SELECT * FROM profiles WHERE profile_id = $1 AND user_id = $2`,
			[profileId, userId]
		);

		if (!rows.length) {
			throw new Error("profileId and userId don't match");
		}

		const { firstName, lastName, email, links } = req.body;

		await db.query(
			`
				UPDATE profiles
				SET 
						first_name = $1,
						last_name = $2,
						email = $3,
						links = $4
				WHERE profile_id = $5;
			`,
			[firstName, lastName, email, JSON.stringify(links), profileId]
		);
		res.json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
});

export default router;
