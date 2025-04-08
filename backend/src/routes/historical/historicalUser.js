const express = require('express');
const router = express.Router();

const Historical = require('../../database/models/Historical');
const User = require('../../database/models/User');

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        const historical = await Historical.findAll({
            where: { userId: id }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ Historical: historical });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { phrase } = req.body;
        const user = await User.findByPk(id);
        const historical = await Historical.findAll({
            where: { userId: id }
        });

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!phrase) {
            return res.status(404).json({ message: 'sentence can not be null' });
        }
        await historical.create({ phrase: phrase });
        res.status(200).json({ message: 'Historical data updated successfully', Historical: historical });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});


module.exports = router;