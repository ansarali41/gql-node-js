<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# GraphQL Node.js Todo API Project

This is a Node.js GraphQL API project for a todo management system with user authentication. The project uses:

-   Express.js for the server
-   Apollo Server for GraphQL
-   TypeORM as the ORM
-   MySQL as the database
-   JWT for authentication

## Architecture Guidance

-   Follow a clean architecture approach with separation of concerns
-   Entity files define database models using TypeORM's EntitySchema
-   GraphQL schema is defined in typeDefs.js
-   Resolvers are organized by domain (user, todo)
-   Authentication is handled via JWT middleware

## Authentication Flow

-   User signs up/logs in and receives a JWT token
-   Token is sent in the Authorization header for authenticated requests
-   AuthMiddleware verifies the token and adds the user to the GraphQL context
-   Resolvers check for authenticated user before allowing access to protected resources

## Development Best Practices

-   Maintain proper error handling with GraphQL-specific error types
-   Validate inputs before processing
-   Keep user passwords encrypted using bcrypt
-   Use TypeORM relationships for related entities
-   Ensure proper authorization checks on all todo operations
