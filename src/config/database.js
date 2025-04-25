const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // Set to false in production
    logging: false,
    entities: ['src/entity/**/*.js'],
    subscribers: [],
    migrations: ['src/migrations/**/*.js'],
});

module.exports = { AppDataSource };
