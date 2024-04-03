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
				'SELECT * FROM users WHERE email = $1',
				[email]
			);
			if (!rows.length) {
				cb(null, false, {
					message: 'Incorrect username or password.'
				});
			}

			const { id, password: hashPassword } = rows[0];

			if (await bcrypt.compare(password, hashPassword)) {
				cb(null, { id, email });
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
