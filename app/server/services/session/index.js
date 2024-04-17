import _pgSession from 'connect-pg-simple';
import session from 'express-session';

import db from '../../db/index.js';

const PgSession = _pgSession(session);

export default app =>
	app.use(
		session({
			secret: process.env.SECRET,
			resave: false, // don't save session if unmodified
			saveUninitialized: false, // don't create session until something stored
			store: new PgSession({
				pool: db.pool
			}),
			cookie: {
				sameSite: false,
				secure: false,
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
				httpOnly: true
			}
		})
	);
