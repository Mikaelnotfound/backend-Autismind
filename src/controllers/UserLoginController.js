"use strict";

const userQuerys = require('../database/querys/UserQuerys');
const bcrypt = require('bcrypt');
const verifyEmail = require('../utils/verify');
const Auth = require('../utils/auth');
const CookieService = require('../utils/CookieService');

class UserLoginController {
    constructor(userQuerys, bcrypt, verifyEmail, Auth, cookie) {
        this.userQuerys = userQuerys;
        this.bcrypt = bcrypt;
        this.verifyEmail = verifyEmail;
        this.Auth = Auth;
        this.cookie = cookie
    }

    async postUserLogin(req, res) {
        try {
            const { email, password } = req.body;

            if (!this.verifyEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            if (!password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await this.userQuerys.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await this.bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = this.Auth.generateToken(user);

            this.cookie.set(res, 'access_token', token);

            res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new UserLoginController(userQuerys, bcrypt, verifyEmail, Auth, CookieService);