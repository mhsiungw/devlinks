#!/usr/bin/env node

import 'dotenv/config.js';

/**
 * Module dependencies.
 */

import _debug from 'debug';
import http from 'http';
import app from '../app.js';

const debug = _debug('development:www');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

async function startServer() {
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
}

startServer();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	// eslint-disable-next-line no-shadow
	const port = parseInt(val, 10);

	if (Number.isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			debug(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			debug(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	// console.log(`Listening on ${bind}`)
	debug(`Listening on ${bind}`);
}
