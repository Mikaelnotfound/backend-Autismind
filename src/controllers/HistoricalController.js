"use strict";

const historicalQuerys = require('../database/querys/HistoricalQuerys');
const userQuerys = require('../database/querys/UserQuerys');

class HistoricalController {
    constructor(historicalQuerys, userQuerys) {
        this.historicalQuerys = historicalQuerys;
        this.userQuerys = userQuerys;
    }
    
    async getHistoricalUser(req, res) {
        try {
            const { userId } = req.params;
            const loggedUserId = req.user.id;

            const user = await this.userQuerys.getUserId(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            if (parseInt(userId) !== loggedUserId) {
                return res.status(403).json({ message: 'Access denied' });
            }

            const historical = await this.historicalQuerys.getHistoricalByUserId(userId);
            if (!historical) {
                return res.status(404).json({ message: 'Historical data not found' });
            }

            res.status(200).json({ historical });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new HistoricalController(historicalQuerys, userQuerys);