# Use the official Node.js image as the base image
FROM node:16-alpine as development

# Set the working directory
WORKDIR /usr/src/app

# Copy the root package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Set the working directory to the user service
WORKDIR /usr/src/app/apps/participants

# Build the NestJS application
RUN npm run build

# Expose the ports the app runs on
EXPOSE 3005

# Define the command to run the application
CMD ["npm", "run", "start:dev"]