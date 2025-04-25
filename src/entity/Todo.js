const { EntitySchema } = require('typeorm');

class Todo {
    constructor(id, title, description, completed, user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed || false;
        this.user = user;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = {
    Todo,
    TodoSchema: new EntitySchema({
        name: 'Todo',
        target: Todo,
        tableName: 'todos',
        columns: {
            id: {
                primary: true,
                type: 'int',
                generated: true,
            },
            title: {
                type: 'varchar',
                length: 255,
            },
            description: {
                type: 'text',
                nullable: true,
            },
            completed: {
                type: 'boolean',
                default: false,
            },
            createdAt: {
                name: 'created_at',
                type: 'timestamp',
                createDate: true,
            },
            updatedAt: {
                name: 'updated_at',
                type: 'timestamp',
                updateDate: true,
            },
        },
        relations: {
            user: {
                target: 'User',
                type: 'many-to-one',
                joinColumn: {
                    name: 'user_id',
                },
                inverseSide: 'todos',
            },
        },
    }),
};
