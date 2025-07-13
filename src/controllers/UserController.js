"use strict";

const userQuerys = require('../database/querys/UserQuerys');
const bcrypt = require('bcrypt');
const Auth = require('../utils/Auth');
const catchAsync = require('../utils/error/catchAsync');
const AppError = require('../utils/error/AppError');

const validateEmail = (email) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);

class UserController {

    login = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide email and password!', 400));
        }

        if (!validateEmail(email)) {
            return next(new AppError('Invalid email format', 400));
        }

        const user = await userQuerys.getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        const token = Auth.generateToken(user);

        res.status(200).json({ 
            message: 'Login successful', 
            user: { id: user.id, username: user.username, email: user.email, jwt_token: token } 
        });
    });

    getAll = catchAsync(async (req, res, next) => {
        const users = await userQuerys.getAllUsers();
        res.status(200).json({ status: 'success', results: users.length, data: { users } });
    });
    
    getById = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const user = await userQuerys.getUserId(id);
        if (!user) {
            return next(new AppError('No user found with that ID', 404));
        }
        res.status(200).json({ status: 'success', data: { user } });
    });

    create = catchAsync(async (req, res, next) => {
        const { username, password, email, communication_level } = req.body;
        
        if (!validateEmail(email)) {
            return next(new AppError('Invalid email format', 400));
        }
        
        if (!username || !password || !communication_level) {
            return next(new AppError('Username, password and communication level are required', 400));
        }

        const userExists = await userQuerys.verifyUser(username, email);
        if (userExists) {
            return next(new AppError('User already exists', 409));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userQuerys.addUser(username, email, hashedPassword, communication_level);
        
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: { user: { id: newUser, username, email, communication_level } }
        });
    });

    update = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const { username, password, email } = req.body;

        const user = await userQuerys.getUserId(id);
        if (!user) {
            return next(new AppError('No user found with that ID', 404));
        }

        if (email && !verifyEmail(email)) {
            return next(new AppError('Invalid email format', 400));
        }

        const updatedUsername = username || user.username;
        const updatedEmail = email || user.email;
        const updatedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        await userQuerys.updateUser(id, updatedUsername, updatedEmail, updatedPassword);
        
        res.status(200).json({ 
            status: 'success', 
            message: 'User updated successfully' 
        });
    });

    delete = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const user = await userQuerys.getUserId(id);
        if (!user) {
            return next(new AppError('No user found with that ID', 404));
        }
        await userQuerys.deleteUser(id);
        res.status(204).json({ status: 'success', data: null });
    });
}

module.exports = new UserController();