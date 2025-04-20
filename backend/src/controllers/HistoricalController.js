const query = require('../database/DatabaseQuerys'); // Import the database connection

class HistoricalController {
    async getHistoricalUser(req, res) {
        try {
            const { id } = req.params;
            const user = await query.getUserId(id) // Fetch user by ID from the database
            // Check if user exists in the database
            const historical = await query.getHistoricalData(id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ Historical: historical });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async postHistoricalUser(req, res) {
        try {
            const { id } = req.params;
            const { phrase } = req.body; // Extract phrase from the request body

            const user = await query.getUserId(id); // Fetch user by ID from the database
            const historical = await query.getHistoricalData(id);
    
            if(!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            if (!phrase) {
                return res.status(404).json({ message: 'sentence can not be null' });
            }
            await query.addHistoricalData(id, phrase) // Create historical data for the user in the database

            res.status(200).json({ message: 'Historical data updated successfully', Historical: historical });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new HistoricalController();