import { Router } from 'express';
import db from '../../db/index.js';

const router = Router();

router.get('/:profileId', async (req, res) => {
	const { profileId } = req.params;

	const { rows } = await db.query('SELECT * FROM profiles WHERE id = $1', [
		profileId
	]);

	res.json({ message: 'ok', data: rows[0] });
});

router.post('/', async (req, res, next) => {
	const userId = req?.user?.id || 3;
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

export default router;
