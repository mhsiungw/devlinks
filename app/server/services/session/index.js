import _pgSession from 'connect-pg-simple';
import session from 'express-session';

import db from '../../db/index.js';

const PgSession = _pgSession(session);

export default app => {
	const sess = {
		secret: process.env.SECRET,
		resave: false, // don't save session if unmodified
		saveUninitialized: false, // don't create session until something stored
		store: new PgSession({
			pool: db.pool
		}),
		cookie: {
			sameSite: false,
			secure: process.env.mode === 'production',
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: true
		}
	};

	if (process.env.mode === 'production') {
		app.set('trust proxy', 1);
		sess.cookie.secure = true;
	}

	app.use(session(sess));
};
