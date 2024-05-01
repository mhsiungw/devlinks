import pg from 'pg';

const pool = new pg.Pool({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.PGPORT,
	ssl: {
		require: process.env.PGSSL,
		rejectUnauthorized: false
	}
});

const query = (text, params, callback) => pool.query(text, params, callback);

export default {
	query,
	pool
};
