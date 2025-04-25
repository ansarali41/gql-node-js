const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        todos: [Todo!]
        createdAt: String!
        updatedAt: String!
    }

    type Todo {
        id: ID!
        title: String!
        description: String
        completed: Boolean!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        me: User
        todo(id: ID!): Todo
        todos: [Todo!]!
        userTodos: [Todo!]!
    }

    type Mutation {
        # User mutations
        registerUser(username: String!, email: String!, password: String!): AuthPayload!
        loginUser(email: String!, password: String!): AuthPayload!

        # Todo mutations
        createTodo(title: String!, description: String): Todo!
        updateTodo(id: ID!, title: String, description: String, completed: Boolean): Todo!
        deleteTodo(id: ID!): Boolean!
    }
`;

module.exports = typeDefs;
