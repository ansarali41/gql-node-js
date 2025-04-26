# Use Node.js LTS version as base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (matches your .env PORT=4000)
EXPOSE 4000


CMD ["npm", "start", "run"]

