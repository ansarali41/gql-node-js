const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');
const { User } = require('../entity/User');
const { ApolloError, AuthenticationError } = require('apollo-server-express');

const generateToken = user => {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

const userResolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }
            console.log('user', user);

            const userRepository = AppDataSource.getRepository(User);
            return await userRepository.findOne({
                where: { id: user.id },
                relations: ['todos'],
            });
        },
    },

    Mutation: {
        registerUser: async (_, { username, email, password }, { user }) => {
            console.log('reg user:', user);
            const userRepository = AppDataSource.getRepository(User);

            // Check if user already exists
            const existingUser = await userRepository.findOne({
                where: [{ email }, { username }],
            });

            if (existingUser) {
                throw new ApolloError('User already exists with that email or username');
            }

            // Create new user
            const newUser = new User(null, username, email, password, []);
            await newUser.hashPassword();

            const savedUser = await userRepository.save(newUser);
            const token = generateToken(savedUser);

            return {
                token,
                user: savedUser,
            };
        },

        loginUser: async (_, { email, password }) => {
            const userRepository = AppDataSource.getRepository(User);

            // Find user by email
            const user = await userRepository.findOne({
                where: { email },
            });

            if (!user) {
                throw new AuthenticationError('Invalid email or password');
            }

            // Check password
            const isValid = await user.comparePassword(password);

            if (!isValid) {
                throw new AuthenticationError('Invalid email or password');
            }

            const token = generateToken(user);

            return {
                token,
                user,
            };
        },
    },
};

module.exports = userResolvers;
