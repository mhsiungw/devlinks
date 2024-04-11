import { Router } from 'express';
import db from '../../db/index.js';

const router = new Router();

router.get('/:openProfileId', async (req, res, next) => {
	try {
		const { openProfileId } = req.params;

		const { rows } = await db.query(
			`
				SELECT
					profiles.profile_id "profileId",
					profiles.first_name "firstName",
					profiles.last_name "lastName",
					profiles.avatar_url "avatarUrl",
					profiles.email,
					profiles.links
				FROM profiles
				JOIN open_profiles ON profiles.profile_id = open_profiles.open_profile_id
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
