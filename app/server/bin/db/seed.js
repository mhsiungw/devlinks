#!/usr/bin/env node

import 'dotenv/config.js';

import pg from 'pg';
import user from './seeds/users.js';

async function initDb() {
	const client = new pg.Client({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.POSTGRES_PASSWORD,
		port: process.env.PGPORT
	});

	client.connect();

	await client.query('DROP TABLE IF EXISTS users;');

	await client.query(
		`
			CREATE TABLE IF NOT EXISTS users
			(
				id SERIAL PRIMARY KEY,
				email VARCHAR ( 255 ) UNIQUE NOT NULL,
				password VARCHAR (255) NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`
	);

	const queries = [];

	user.forEach(({ email, password }) => {
		queries.push(
			client.query(
				`
				INSERT INTO users (email, password) VALUES ($1, $2)
			`,
				[email, password]
			)
		);
	});

	await Promise.allSettled(queries);

	client.end();
}

initDb();
