const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../database/models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({ Users: users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ User: user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });

    }
});


router.post('/', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const verify = await User.findByPk(username, {
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
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verify = await User.findByPk(username, {
            where: { username: username, email: email }
        });

        if(verify) {
            return res.status(409).json({ message: 'User already exists' });
        }else {
        
            user.username = username || user.username;
            user.email = email || user.email;
            user.password = password ? await bcrypt.hash(password, 10) : user.password;
            await user.save();
            res.status(200).json({ message: 'User updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }

});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy({
            where: { id: id }
        });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });

    }

});

module.exports = router;