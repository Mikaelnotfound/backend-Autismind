"use strict";

const jwt = require('jsonwebtoken');
const { promisify } = require('util');


class Auth {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRATION = process.env.JWT_EXPIRATION;
    }

    async generateToken(user) {
        const signAsync = promisify(jwt.sign);
        try {
            const token = await signAsync(
                { id: user.id, email: user.email },
                this.JWT_SECRET,
                { expiresIn: this.JWT_EXPIRATION }
            );
            return token;
        } catch (error) {
            throw error;
        }
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
            throw new Error('Invalid token') || error;
        }
    }
}


module.exports = new Auth();
