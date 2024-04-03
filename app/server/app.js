import cors from 'cors';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';

import router from './routes/v1/index.js';

// services
import passport from './services/passport/index.js';
import errorHandler from './services/error-handler/index.js';

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3001',
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
		credentials: true
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SECRET,
		resave: false, // don't save session if unmodified
		saveUninitialized: false, // don't create session until something stored
		// store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
		cookie: {
			sameSite: false,
			secure: false,
			maxAge: 200000,
			httpOnly: true
		}
	})
);

passport(app);

app.use('/api/v1', router);

app.get('/', (req, res) => {
	res.json({ message: 'from root' });
});

errorHandler(app);

export default app;
