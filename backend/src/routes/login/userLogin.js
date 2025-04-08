const express = require('express');
const router = express.Router();

const User = require('../../database/models/User');

router.get('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findByPk(req.params.id, {
            where: { username, email, password }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password or email' });
        }
        
        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword && user.email === email && user.username === username) {
            return res.status(200).json({ message: 'Login successful', user });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }

});

module.exports = router;