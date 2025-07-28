const ErrorHandler = (err, req, res, next) => {
    if(err.isOperational) {
	return res.status(err.statusCode).json({
	    status: err.status,
	    message: err.message
	});
    }

	console.error('ERROR!', err);

	return res.status(500).json({
	    status: 'error',
	    message: 'something went very wrong'
	});
}


module.exports = ErrorHandler;

