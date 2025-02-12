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

# Build the NestJS application
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy the lib folder from the builder stage
COPY --from=builder /usr/src/app/lib ./lib

# Expose the ports the app runs on
EXPOSE 3011

# Define the command to run the application
CMD ["npm", "run", "start:dev forum"]
# CMD ["node", "dist/apps/forum"]/src/main.js"]

