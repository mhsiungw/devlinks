import { Router } from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import db from '../../db/index.js'

const router = Router()

passport.use(
	new LocalStrategy({ usernameField: 'email' }, async function verify(
		email,
		password,
		cb
	) {
		try {
			const { rows } = await db.query(
				'SELECT * FROM users WHERE email = $1',
				[email]
			)
			if (!rows.length) {
				throw new Error('Incorrect username or password.')
			}

			const { id, password: hashPassword } = rows[0]

			if (await bcrypt.compare(password, hashPassword)) {
				cb(null, { id, email })
			} else {
				throw new Error('Incorrect username or password.')
			}
		} catch (err) {
			cb(null, false, err)
		}
	})
)

passport.serializeUser((user, cb) => {
	process.nextTick(() => {
		cb(null, { id: user.id, email: user.email })
	})
})

passport.deserializeUser((user, cb) => {
	process.nextTick(() => {
		cb(null, user)
	})
})

router.post(
	'/login/password',
	passport.authenticate('local', {
		successReturnToOrRedirect: '/',
		failureRedirect: '/',
		failureMessage: true,
	})
)

router.get('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect('/')
	})
})

router.get('/signup', async (req, res, next) => {
	const { email, password } = req.body

	try {
		const hashedPassword = await bcrypt.hash(password, 10)

		await db.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [
			email,
			hashedPassword,
		])

		res.json({ result: 'ok' })
	} catch (err) {
		next(err)
	}
})

export default router
