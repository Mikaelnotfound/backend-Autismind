"use strict";

const userQuerys = require('../database/querys/UserQuerys');
const bcrypt = require('bcrypt');
const verifyEmail = require('../utils/verify');


class UserRegisterController {
    constructor(userQuerys, bcrypt, verifyEmailFunction){
        this.verifyEmail = verifyEmailFunction;
        this.userQuerys = userQuerys;
        this.bcrypt = bcrypt;
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.userQuerys.getAllUsers();
            if (!users) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.status(200).json({ Users: users });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
    
    async getUserId(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userQuerys.getUserId(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ User: user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });

        }
    }

    async postNewUser(req, res) {
        try {
            const { username, password, email, communication_level } = req.body;
            
            if (!this.verifyEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
            
            if (!username || !password || !communication_level) {
                return res.status(400).json({ message: 'Username, password and communication level are required' });
            }

            const userExists = await this.userQuerys.verifyUser(username, email);
            if (userExists) {
                return res.status(409).json({ message: 'User already exists' });
            } else {
                const hashedPassword = await this.bcrypt.hash(password, 10);
                await this.userQuerys.addUser(username, email, hashedPassword, communication_level);
                res.status(201).json({
                    message: 'User registered successfully',
                    user: { username, email, communication_level }
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }


    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, password, email } = req.body;
            const user = await this.userQuerys.getUserId(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!this.verifyEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            const verify = await this.userQuerys.verifyUser(username, email);

            if (verify) {
                return res.status(409).json({ message: 'User already exists' });
            } else {
                await this.userQuerys.updateUser(
                    id,
                    user.username = username || user.username,
                    user.email = email || user.email,
                    user.password = password ? await this.bcrypt.hash(password, 10) : user.password
                );
                res.status(200).json({ message: 'User updated successfully' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }


    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userQuerys.getUserId(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await this.userQuerys.deleteUser(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });

        }
    }
}


module.exports = new UserRegisterController(userQuerys, bcrypt, verifyEmail);