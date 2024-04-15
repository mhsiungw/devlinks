import createError from 'http-errors';

export default app => {
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(createError(404));
	});

	// error handler
	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500).json({
			error: true,
			message: err.message || 'Something wnet wrong!',
			data: null
		});
	});
};
