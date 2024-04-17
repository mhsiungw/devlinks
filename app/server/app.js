import path from 'path';
import { URL } from 'node:url';
import cors from 'cors';
import express from 'express';

import logger from 'morgan';

import router from './routes/v1/index.js';

// services
import passport from './services/passport/index.js';
import errorHandler from './services/error-handler/index.js';
import session from './services/session/index.js';

const app = express();

app.use(
	cors({
		origin: process.env.origin,
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
		credentials: true
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	'/static',
	express.static(path.join(new URL('.', import.meta.url).pathname, 'public'))
);
session(app);

passport(app);

app.use('/api/v1', router);

app.get('/', (req, res) => {
	res.json({ message: 'from root' });
});

errorHandler(app);

export default app;
