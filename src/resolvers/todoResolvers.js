const { AppDataSource } = require('../config/database');
const { Todo } = require('../entity/Todo');
const { User } = require('../entity/User');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

const todoResolvers = {
    Query: {
        todo: async (_, { id }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }

            const todoRepository = AppDataSource.getRepository(Todo);
            const todo = await todoRepository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (!todo) {
                throw new ApolloError('Todo not found');
            }

            // Check if the todo belongs to the user
            if (todo.user.id !== user.id) {
                throw new AuthenticationError('Not authorized to access this todo');
            }

            return todo;
        },

        todos: async () => {
            const todoRepository = AppDataSource.getRepository(Todo);
            return await todoRepository.find({ relations: ['user'] });
        },

        userTodos: async (_, __, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }

            const todoRepository = AppDataSource.getRepository(Todo);
            return await todoRepository.find({
                where: { user: { id: user.id } },
                relations: ['user'],
            });
        },
    },

    Mutation: {
        createTodo: async (_, { title, description }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }

            const todoRepository = AppDataSource.getRepository(Todo);
            const userRepository = AppDataSource.getRepository(User);

            const currentUser = await userRepository.findOne({ where: { id: user.id } });

            if (!currentUser) {
                throw new AuthenticationError('User not found');
            }

            const newTodo = new Todo(null, title, description, false, currentUser);
            return await todoRepository.save(newTodo);
        },

        updateTodo: async (_, { id, title, description, completed }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }

            const todoRepository = AppDataSource.getRepository(Todo);
            const todo = await todoRepository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (!todo) {
                throw new ApolloError('Todo not found');
            }

            // Check if the todo belongs to the user
            if (todo.user.id !== user.id) {
                throw new AuthenticationError('Not authorized to update this todo');
            }

            // Update todo fields
            if (title !== undefined) todo.title = title;
            if (description !== undefined) todo.description = description;
            if (completed !== undefined) todo.completed = completed;

            return await todoRepository.save(todo);
        },

        deleteTodo: async (_, { id }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated');
            }

            const todoRepository = AppDataSource.getRepository(Todo);
            const todo = await todoRepository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (!todo) {
                throw new ApolloError('Todo not found');
            }

            // Check if the todo belongs to the user
            if (todo.user.id !== user.id) {
                throw new AuthenticationError('Not authorized to delete this todo');
            }

            await todoRepository.remove(todo);
            return true;
        },
    },
};

module.exports = todoResolvers;
