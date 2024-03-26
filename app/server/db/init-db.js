#!/usr/bin/env node

import db from './index.js';

import user from './seeds/user.js';


async function initDb (db) {
	await db.query(
		`
			CREATE TABLE IF NOT EXISTS "user"
			(
				id SERIAL PRIMARY KEY,
				email VARCHAR ( 255 ) UNIQUE NOT NULL,
				password VARCHAR (255) NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`
	)

	user.forEach(({ email, password }) => {
		db.query(
			`
				INSERT INTO "user" (email, password) VALUES ($1, $2)
			`,
			[email, password]
		)
	})
}

initDb(db)
