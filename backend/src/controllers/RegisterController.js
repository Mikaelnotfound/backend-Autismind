const bcrypt = require('bcrypt');
const User = require('../database/models/User'); // Import the User model from the database models


class RegisterController {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll(); // Fetch all users from the database
            if (!users) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.status(200).json({ Users: users });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async getUserId(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id); // Fetch user by ID from the database
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ User: user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });

        }
    }

    async postNewUser(req, res) {
        try {
            const { username, password, email } = req.body; // Extract username, password, and email from the request body
            // Check if username, password, and email are provided
            if (!username || !password || !email) {
                return res.status(400).json({ message: 'Username, email and password are required' });
            }
            // Check if user already exists in the database
            const verify = await User.findOne({
                where: { username: username, email: email }
            });
    
            if (verify) {
                return res.status(409).json({ message: 'User already exists' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
                await User.create({
                    username: username,
                    email: email,
                    password: hashedPassword,
    
                });
                res.status(201).json({ message: 'User registered successfully' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }


    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, password, email } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const verify = await User.findOne({
                where: { username: username, email: email }
            });
    
            if(verify) {
                return res.status(409).json({ message: 'User already exists' });
            }else {
            
                user.username = username || user.username;
                user.email = email || user.email;
                user.password = password ? await bcrypt.hash(password, 10) : user.password; // Hash the password if provided
                // Update the user details in the database
                await user.save(); // Save the updated user to the database
                res.status(200).json({ message: 'User updated successfully' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }   
    }

    
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id); // Fetch user by ID from the database
            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await user.destroy(); // Delete the user from the database
            // Check if user was deleted successfully
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
    
        }
    }
}


module.exports = new RegisterController();