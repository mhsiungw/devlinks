#!/usr/bin/env node

import 'dotenv/config.js';

import pg from 'pg';
import users from './seeds/users.js';
import profiles from './seeds/profiles.js';
import openProfiles from './seeds/open_profiles.js';

async function initDb() {
	const pool = new pg.Pool({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.POSTGRES_PASSWORD,
		port: process.env.PGPORT
	});

	try {
		await pool.query('DROP TABLE IF EXISTS users CASCADE;');
		await pool.query('DROP TABLE IF EXISTS profiles CASCADE;');
		await pool.query('DROP TABLE IF EXISTS open_profiles CASCADE;');

		// users
		await pool.query(
			`
			CREATE TABLE IF NOT EXISTS users
			(
				user_id SERIAL PRIMARY KEY,
				email VARCHAR ( 255 ) UNIQUE NOT NULL,
				password VARCHAR (255) NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`
		);

		const usersQueries = [];

		users.forEach(({ email, password }) => {
			usersQueries.push(
				pool.query(
					`
					INSERT INTO users (email, password) VALUES ($1, $2)
				`,
					[email, password]
				)
			);
		});

		await Promise.allSettled(usersQueries);

		// profiles
		await pool.query(
			`
				CREATE TABLE IF NOT EXISTS profiles
				(
					profile_id SERIAL PRIMARY KEY,
					user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
					first_name VARCHAR( 255 ) NOT NULL,
					last_name VARCHAR( 255 ) NOT NULL,
					email VARCHAR ( 255 ) NOT NULL,
					avatar_url TEXT,
					links JSONB,
					created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
				)
			`
		);

		const profileQueries = [];

		profiles.forEach(
			({ userId, firstName, lastName, email, avatarUrl, links }) => {
				profileQueries.push(
					pool.query(
						`
							INSERT INTO profiles (user_id, first_name, last_name, email, avatar_url, links) VALUES ($1, $2, $3, $4, $5, $6)
						`,
						[
							userId,
							firstName,
							lastName,
							email,
							avatarUrl,
							JSON.stringify(links)
						]
					)
				);
			}
		);

		await Promise.allSettled(profileQueries);

		// open_profiles
		await pool.query(
			`
				CREATE TABLE IF NOT EXISTS open_profiles
				(	
					open_profile_id SERIAL PRIMARY KEY,
					profile_id INT REFERENCES profiles(profile_id) ON DELETE CASCADE,
					user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
					created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
				)
			`
		);

		const openProfileQueries = [];

		openProfiles.forEach(({ userId, profileId }) => {
			openProfileQueries.push(
				pool.query(
					`
						INSERT INTO open_profiles (user_id, profile_id) VALUES ($1, $2)
					`,
					[userId, profileId]
				)
			);
		});

		await Promise.allSettled(openProfileQueries);

		await pool.end();
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log('err', err);
	}
}

initDb();
