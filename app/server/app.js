import createError from 'http-errors';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import passport from 'passport';

import router from './routes/v1/index.js';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SECRET,
	resave: false, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	// store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

app.use(passport.authenticate('session'));

app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	console.log('----global error handler----');

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ err });
});

export default app;
