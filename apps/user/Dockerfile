# Use the official Node.js image as the base image
FROM node:16-alpine as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the root package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the working directory to the auth service
# WORKDIR /usr/src/app/apps/user

# Build the NestJS application
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy the package.json and package-lock.json files
COPY ./package*.json ./

# Copy the .proto file
COPY lib/common/user.proto ./lib/common/user.proto

COPY apps/user/test ./test

# Install production dependencies
RUN npm install --only=production && npm install --save-dev ts-jest jest @types/jest

# Expose the ports the app runs on
EXPOSE 3001

# Define the command to run the application
CMD ["node", "dist/apps/user/src/main.js"]
