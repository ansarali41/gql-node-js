const { EntitySchema } = require('typeorm');
const bcrypt = require('bcryptjs');

class User {
    constructor(id, username, email, password, todos) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.todos = todos;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

module.exports = {
    User,
    UserSchema: new EntitySchema({
        name: 'User',
        target: User,
        tableName: 'users',
        columns: {
            id: {
                primary: true,
                type: 'int',
                generated: true,
            },
            username: {
                type: 'varchar',
                length: 100,
                unique: true,
            },
            email: {
                type: 'varchar',
                length: 100,
                unique: true,
            },
            password: {
                type: 'varchar',
                length: 255,
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
            todos: {
                target: 'Todo',
                type: 'one-to-many',
                inverseSide: 'user',
                cascade: true,
            },
        },
    }),
};
