const userResolvers = require('./userResolvers');
const todoResolvers = require('./todoResolvers');

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...todoResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...todoResolvers.Mutation,
    },
};

module.exports = resolvers;
