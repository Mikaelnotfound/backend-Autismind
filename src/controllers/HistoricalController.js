
"use strict";

const historicalQuerys = require('../database/querys/HistoricalQuerys');
const userQuerys = require('../database/querys/UserQuerys');
const { NotFoundError, ForbiddenError } = require('../service/error/errorClasses');

class HistoricalController {
    constructor(historicalQuerys, userQuerys) {
        this.historicalQuerys = historicalQuerys;
        this.userQuerys = userQuerys;
    }
    
    async getHistoricalUser(req, res, next) {
        try {
            const { userId } = req.params;
            const loggedUserId = req.user.id;

            const user = await this.userQuerys.getUserId(userId)
            if (!user) {
                return next(new NotFoundError('User not found'));
            }
            
            if (parseInt(userId) !== loggedUserId) {
                return next(new ForbiddenError('Access denied'));
            }

            const historical = await this.historicalQuerys.getHistoricalByUserId(userId);
            if (!historical) {
                return next(new NotFoundError('Historical data not found'));
            }

            res.status(200).json({ historical });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HistoricalController(historicalQuerys, userQuerys);
