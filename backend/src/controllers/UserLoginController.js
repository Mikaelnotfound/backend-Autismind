const query = require('../database/DatabaseQuerys'); // Import the database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing


class UserLoginController {
    async getUserLogin(req, res) {
        try {
            const { email, password } = req.body;

            // Verifique se os campos obrigatórios estão presentes
            if (!email || !password) {
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

            // Retorne uma resposta de sucesso (você pode gerar um token JWT aqui, se necessário)
            res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new UserLoginController();