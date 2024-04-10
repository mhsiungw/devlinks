import { Router } from 'express';
import db from '../../db/index.js';

const router = new Router();

router.get('/:openProfileId', async (req, res, next) => {
	try {
		const { openProfileId } = req.params;

		const { rows } = await db.query(
			`
				SELECT * FROM open_profiles
				JOIN profiles ON open_profiles.open_profile_id = profiles.profile_id
				WHERE open_profiles.open_profile_id = $1
			`,
			[openProfileId]
		);

		if (!rows.length) {
			res.status = 400;
			next(new Error('Invalid request'));
		}

		await res.json({ message: 'ok', data: rows[0] });
	} catch (err) {
		next(err);
	}
});

export default router;
