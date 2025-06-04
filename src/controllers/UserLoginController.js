const query = require('../database/querys/UserQuerys'); // Import the database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const verifyEmail = require('../utils/verify');

const Auth = require('../utils/auth'); // Import the Auth class

class UserLoginController {
    async postUserLogin(req, res) {
        try {
            const { email, password } = req.body;

            // check if email and passoword are valid
            if (!verifyEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            if (!password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Busque o usuário no banco de dados pelo email
            const user = await query.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verifique a senha fornecida com a senha hash armazenada
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = Auth.generateToken(user);

            res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, jwt_token: token } });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new UserLoginController();