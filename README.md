# GraphQL Todo API with Node.js, MySQL, and TypeORM

A GraphQL API for managing user accounts and todo items with authentication.

## Features

-   User authentication with JWT
-   User registration and login
-   Create, read, update and delete todo items
-   Todo items secured by authentication
-   GraphQL API with Apollo Server
-   MySQL database with TypeORM

## Prerequisites

-   Node.js (v14+ recommended)
-   MySQL server
-   npm or yarn

## Setup

1. Clone this repository
2. Install dependencies:
    ```
    npm install
    ```
3. Create a MySQL database named `graphql_todo_db`
4. Update the `.env` file with your database credentials
5. Start the server:
    ```
    npm run dev
    ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=graphql_todo_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
```

## API Usage

### GraphQL Endpoint

The GraphQL API is available at: `http://localhost:4000/graphql`

### Authentication

Use the following mutations to register and login:

```graphql
# Register a new user
mutation {
    registerUser(username: "testuser", email: "test@example.com", password: "password123") {
        token
        user {
            id
            username
            email
        }
    }
}

# Login
mutation {
    loginUser(email: "test@example.com", password: "password123") {
        token
        user {
            id
            username
            email
        }
    }
}
```

For authenticated requests, include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Todo Operations

```graphql
# Create a todo (authenticated)
mutation {
    createTodo(title: "Complete project", description: "Finish the GraphQL API project") {
        id
        title
        description
        completed
    }
}

# Get user todos (authenticated)
query {
    userTodos {
        id
        title
        description
        completed
    }
}

# Update a todo (authenticated)
mutation {
    updateTodo(id: "1", completed: true) {
        id
        title
        completed
    }
}

# Delete a todo (authenticated)
mutation {
    deleteTodo(id: "1")
}
```

## Project Structure

```
.
├── src/
│   ├── config/        # Configuration files
│   ├── entity/        # TypeORM entity definitions
│   ├── middleware/    # Express and GraphQL middleware
│   ├── resolvers/     # GraphQL resolvers
│   ├── schema/        # GraphQL schema definitions
│   ├── utils/         # Utility functions
│   └── index.js       # Application entry point
├── .env               # Environment variables
└── package.json       # Project dependencies
```
