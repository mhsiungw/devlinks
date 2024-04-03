#!/usr/bin/env node

import 'dotenv/config.js';

import pg from 'pg';
import users from './seeds/users.js';
import profiles from './seeds/profiles.js';

async function initDb() {
	const pool = new pg.Pool({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.POSTGRES_PASSWORD,
		port: process.env.PGPORT
	});

	try {
		await pool.query('DROP TABLE IF EXISTS users CASCADE;');
		await pool.query('DROP TABLE IF EXISTS profiles;');

		// users
		await pool.query(
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

		users.forEach(({ email, password }) => {
			pool.query(
				`
					INSERT INTO users (email, password) VALUES ($1, $2)
				`,
				[email, password]
			);
		});

		// profiles
		await pool.query(
			`
				CREATE TABLE IF NOT EXISTS profiles
				(
					id SERIAL PRIMARY KEY,
					user_id INT REFERENCES users(id) ON DELETE CASCADE,
					name VARCHAR( 255 ) NOT NULL,
					email VARCHAR ( 255 ) NOT NULL,
					links JSONB,
					CONSTRAINT check_links_structure CHECK (
						jsonb_typeof(links) = 'object'
					)
				)
			`
		);

		profiles.forEach(({ userId, name, email, links }) => {
			pool.query(
				`
					INSERT INTO profiles (user_id, name, email, links) VALUES ($1, $2, $3, $4)
				`,
				[userId, name, email, JSON.stringify(links)]
			);
		});

		pool.end();
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log('err', err);
	}

	// client.end();
}

initDb();
