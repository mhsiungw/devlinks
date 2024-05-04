import pg from 'pg';

const config = {
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.PGPORT
};

if (process.env.mode === 'production') {
	config.ssl = {
		require: true,
		rejectUnauthorized: false
	};
}

const pool = new pg.Pool(config);

const query = (text, params, callback) => pool.query(text, params, callback);

export default {
	query,
	pool
};
