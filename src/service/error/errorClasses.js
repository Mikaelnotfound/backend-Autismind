class AppError extends Error {
    constructor(message, statusCode){
	super(message)
	
	this.statusCode = statusCode;
	this.sttaus = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
	this.isOperational = true;

	Error.captureStackTrace(this, this.constructor);
	
    }
}


class NotFoundError extends AppError {
    constructor(message = "Not found resource!", statusCode = 404){
	super(message, statusCode);
	this.name = 'Notfounderror';
    }
}


class ValidationError extends AppError {
    constructor(message = "Invalidate data for validations!", statusCode = 400){
	super(message, statusCode);
	this.name = 'ValidationError';
    }
}


class UnauthorizedError extends AppError {
    constructor(message = "Not authorized!", statusCode = 401){
	super(message, statusCode);
	this.name = 'UnauthorizedError';
    }
}


class ForbiddenError extends AppError {
    constructor(message = "Access prohibited!", statusCode = 403){
	super(message, statusCode);
	this.name = 'ForbiddenError';
    }
}


module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError
}
