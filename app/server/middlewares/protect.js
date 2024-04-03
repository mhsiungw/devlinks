export default (req, res, next) => {
	if (!req.isAuthenticated()) {
		next(new Error('not authenticated'));
	}

	next();
};
