const query = require('../database/querys/HistoricalQuerys'); // Import the database connection
const queryUser = require('../database/querys/UserQuerys');

class HistoricalController {
    async getHistoricalUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await queryUser.getUserId(userId) // Fetch user by ID from the database
            
            // Check if user exists in the database
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const historical = await query.getHistoricalByUserId(userId);
            if (!historical) {
                return res.status(404).json({ message: 'Historical data not found' });
            }
            
            res.status(200).json({ historical });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new HistoricalController();