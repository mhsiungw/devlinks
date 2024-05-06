import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import db from '../../db/index.js';

export default new LocalStrategy(
	{
		usernameField: 'email'
	},
	async (email, password, cb) => {
		try {
			const { rows } = await db.query(
				`
					SELECT users.user_id "userId", password, profile_id "profileId"
					FROM users
					INNER JOIN profiles ON users.user_id = profiles.user_id
					WHERE users.email = $1;
				`,
				[email]
			);

			if (!rows.length) {
				return cb(null, false, {
					message: 'Incorrect username or password.'
				});
			}

			const { userId, password: hashPassword, profileId } = rows[0];

			if (await bcrypt.compare(password, hashPassword)) {
				cb(null, { id: userId, email, profileId });
			} else {
				cb(null, false, {
					message: 'Incorrect username or password.'
				});
			}
		} catch (err) {
			cb(err);
		}
	}
);
