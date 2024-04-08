export default (req, res, next) => {
	if (!req.isAuthenticated()) {
		// TODO: replace with http-error package
		const err = new Error('not authenticated');
		err.status = 401;

		next(err);
	}

	next();
};
