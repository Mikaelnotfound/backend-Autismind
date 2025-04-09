const User = require('../database/models/User');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing


class UserLoginController {
    async getUserLogin(req, res) {
        try {
            const { username, email, password } = req.body; // Extract username, email, and password from the request body
            if (!username || !password || !email) {
                return res.status(400).json({ message: 'Username and password are required' });
            }
    
            const user = await User.findByPk(req.params.id, {
                where: { username, email, password }
            }); // Fetch user by ID from the database
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const comparePassword = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
            if (comparePassword && user.email === email && user.username === username) {
                return res.status(200).json({ message: 'Login successful', user }); // Return success message and user data
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

module.exports = new UserLoginController();