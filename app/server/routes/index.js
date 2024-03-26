import express from 'express'
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	console.log(123)
	res.json({ a: 123123222123 })
})

export default router
