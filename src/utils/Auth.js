"use strict";

const jwt = require('jsonwebtoken');

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
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
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