# Use the official Node.js image as the base image
FROM node:16-alpine as development

# Set the working directory
WORKDIR /usr/src/app

# Copy the root package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the working directory to the user service
WORKDIR /usr/src/app/apps/user

# Build the NestJS application
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/apps/user/dist ./dist

# Copy the package.json and package-lock.json files
COPY apps/user/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the ports the app runs on
EXPOSE 3001
EXPOSE 5001

# Define the command to run the application
CMD ["node","dist/apps/user/main"]
