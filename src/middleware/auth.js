const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');
const { User } = require('../entity/User');

const verifyToken = async req => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { id: decoded.userId },
        });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        return null;
    }
};

const authMiddleware = async ({ req }) => {
    const user = await verifyToken(req);
    return { user, req };
};

module.exports = { authMiddleware };
