const query = require('../database/querys/UserQuerys'); // Import the database connection
const bcrypt = require('bcrypt');
const verifyEmail = require('../utils/verify');


class UserRegisterController {
    async getAllUsers(req, res) {
        try {
            const users = await query.getAllUsers(); // Fetch all users from the database
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
            const user = await query.getUserId(id); // Fetch user by ID from the database
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
            const { username, password, email, communication_level } = req.body; // Extract username, password, and email from the request body
            
            // check if email is valid
            if (!verifyEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
            
            // Check if username, password, and email are provided
            if (!username || !password || !communication_level) {
                return res.status(400).json({ message: 'Username, password and communication level are required' });
            }

            const userExists = await query.verifyUser(username, email); // Check if user already exists in the database
            if (userExists) {
                return res.status(409).json({ message: 'User already exists' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
                await query.addUser(username, email, hashedPassword, communication_level); // Create a new user in the database
                res.status(201).json({ message: 'User registered successfully' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }


    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, password, email } = req.body;
            const user = await query.getUserId(id); // Fetch user by ID from the database
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const verify = await query.verifyUser(username, email); // Check if user already exists in the database

            if (verify) {
                return res.status(409).json({ message: 'User already exists' });
            } else {
                // Update the user details in the database
                await query.updateUser(
                    id,
                    user.username = username || user.username,
                    user.email = email || user.email,
                    user.password = password ? await bcrypt.hash(password, 10) : user.password // Hash the password if provided
                ); // Update the user in the database
                res.status(200).json({ message: 'User updated successfully' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }


    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await query.getUserId(id) // Fetch user by ID from the database
            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await query.deleteUser(id) // Delete the user from the database
            // Check if user was deleted successfully
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });

        }
    }
}


module.exports = new UserRegisterController();