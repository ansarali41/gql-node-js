const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { AppDataSource } = require('./config/database');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { authMiddleware } = require('./middleware/auth');
const cors = require('cors');
require('dotenv').config();
require('reflect-metadata');

// Initialize express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

async function startServer() {
    // Initialize TypeORM connection
    try {
        await AppDataSource.initialize();
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }

    // Create Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
        formatError: error => {
            // Log the error
            console.error('GraphQL Error:', error);

            // Return a formatted error to the client
            return {
                message: error.message,
                path: error.path,
                extensions: error.extensions,
            };
        },
    });

    // Start the Apollo server
    await server.start();

    // Apply Apollo middleware to Express
    server.applyMiddleware({ app, path: '/graphql' });

    // Start the Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer().catch(err => {
    console.error('Failed to start server:', err);
});
