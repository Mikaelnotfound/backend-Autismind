"use strict";

const userQuerys = require('../database/querys/UserQuerys');
const bcrypt = require('bcrypt');
const verifyEmail = require('../utils/verify');
const Auth = require('../utils/Auth');


const {
    NotFoundError,
    ValidationError,
} = require('../service/error/errorClasses');


class UserRegisterController {
    constructor(userQuerys, bcrypt, verifyEmailFunction){
        this.verifyEmail = verifyEmailFunction;
        this.userQuerys = userQuerys;
        this.bcrypt = bcrypt;
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await this.userQuerys.getAllUsers();
            if (!users) {
                return next(new NotFoundError('No users found'));
            }
            res.status(200).json({ Users: users });
        } catch (err) {
    	    next(err);
	}
    }
    
    async getUserId(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.userQuerys.getUserId(id);
            if (!user) {
                return next(new NotFoundError('User not found'));
            }
            res.status(200).json({ User: user });
        } catch (err) {
	    next(err);
	}
    }

    async postUserLogin(req, res, next) {
	try {
	    const { email, password } = req.body;
	    
	    if (!this.verifyEmail(email)) {
		return next(new ValidationError('Invalid email format'));
	    }

	    if (!password) {
		return next(new ValidationError('Email and password are required'));
	    }

	    const user = await this.userQuerys.getUserByEmail(email);
	    if (!user) {
		return next(new NotFoundError('User not found'));
	    }

	    const isPasswordValid = await this.bcrypt.compare(password, user.password);
	    if (!isPasswordValid) {
		return next(new ValidationError('Invalid password'));
	    }

	    const token = Auth.generateToken(user);
	    
	    res.status(200).json({ message: 'Login are sucessful!', user: { id: user.id, username: user.username, email: user.email, jwt_token: token } });
	    } catch (err) {
	        next(err);
	    }	
    }

    async postNewUser(req, res, next) {
        try {
            const { username, password, email, communication_level } = req.body;
            
            if (!this.verifyEmail(email)) {
                return next(new ValidationError('Invalid email format'));
            }
            
            if (!username || !password || !communication_level) {
                return next(new ValidationError('Username, password and communication level are required'));
            }

            const userExists = await this.userQuerys.verifyUser(username, email);
            if (userExists) {
                return next(new ValidationError('User already exists'));
            } else {
                const hashedPassword = await this.bcrypt.hash(password, 10);
                await this.userQuerys.addUser(username, email, hashedPassword, communication_level);
                res.status(201).json({
                    message: 'User registered successfully',
                    user: { username, email, communication_level }
                });
            }
        } catch (err) {
            next(err);   
	}
    }


    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { username, password, email } = req.body;
            const user = await this.userQuerys.getUserId(id);
            if (!user) {
                return next(new NotFoundError('User not found'));
            }

            if (!this.verifyEmail(email)) {
                return next(new ValidationError('Invalid email format'));
            }

            const verify = await this.userQuerys.verifyUser(username, email);

            if (verify) {
                return next(new ValidationError('User already exists'));
            } else {
                await this.userQuerys.updateUser(
                    id,
                    user.username = username || user.username,
                    user.email = email || user.email,
                    user.password = password ? await this.bcrypt.hash(password, 10) : user.password
                );
                res.status(200).json({ message: 'User updated successfully' });
            }
        } catch (err) {
            next(err);   
	}
    }


    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.userQuerys.getUserId(id);
            if (!user) {
                return next(new NotFoundError('User not found'));
            }
            await this.userQuerys.deleteUser(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            next(err); 
        }
    }
}


module.exports = new UserRegisterController(userQuerys, bcrypt, verifyEmail);
