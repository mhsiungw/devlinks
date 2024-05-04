import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import db from '../../db/index.js';
import uploadS3 from '../../services/upload-s3/index.js';

const getImageStorageName = (userId, profileId, extension) =>
	`${userId + profileId}.${Date.now()}${extension}`;

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024 // limit file size to 5MB
	}
});

const router = Router();

router.get('/:profileId', async (req, res, next) => {
	const { profileId } = req.params;

	try {
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
	} catch (err) {
		next(err);
	}
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

router.get('/share/:profileId', async (req, res, next) => {
	try {
		const { profileId } = req.params;
		const userId = req?.user?.id;

		const { rows } = await db.query(
			`
				SELECT profile_id from profiles
				WHERE user_id = $1 AND profile_id = $2
			`,
			[userId, profileId]
		);

		if (!rows.length) {
			req.status = '401';
			next(new Error('invalid profile Id'));
		}

		const {
			rows: [{ openProfileId }]
		} = await db.query(
			`
				INSERT INTO open_profiles (user_id, profile_id) VALUES ($1, $2)
				ON CONFLICT (user_id) DO UPDATE SET profile_id = $2
				RETURNING open_profile_id AS "openProfileId"
			`,
			[userId, profileId]
		);

		res.json({ error: false, message: 'ok', data: { openProfileId } });
	} catch (err) {
		next(err);
	}
});

router.put(
	'/:profileId',
	upload.single('avatarFile'),
	async (req, res, next) => {
		const userId = req?.user?.id;
		const { profileId } = req.params;

		try {
			const { rows } = await db.query(
				`SELECT * FROM profiles WHERE profile_id = $1 AND user_id = $2`,
				[profileId, userId]
			);

			if (!rows.length) {
				throw new Error("You don't own this profile!");
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
				[firstName, lastName, email, links, profileId]
			);

			if (req.file) {
				const params = {
					Bucket: 'minstack.lol',
					Key: getImageStorageName(
						userId,
						profileId,
						path.extname(req.file?.originalname)
					), // Specify the key (name) under which the file will be stored in S3
					Body: req.file.buffer, // Specify the file data
					ContentType: `image/${path
						.extname(req.file.originalname)
						.replace('.', '')}`
				};

				const avatarUrl = await uploadS3(params);

				await db.query(
					`
						UPDATE profiles
						SET
							avatar_url = $1
						WHERE profile_id = $2;
					`,
					[avatarUrl, profileId]
				);
			}

			res.json({ error: false, message: 'Profile Saved', data: null });
		} catch (err) {
			next(err);
		}
	}
);

export default router;
