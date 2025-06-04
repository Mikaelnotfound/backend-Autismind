const jwt = require('jsonwebtoken'); // Import JWT for token generation

class Auth {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
    }

    generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email },
            this.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );
    }

    middlewareVerifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Malformed token' });
        }
        try {
            const decoded = this.verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (error) {
            console.error('Token verification error:', error || error.message);
            throw new Error('Invalid token') || error;
        }
    }
}


module.exports = new Auth();