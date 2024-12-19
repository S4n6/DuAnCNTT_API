# Use the official Node.js image as the base image
FROM node:16-alpine as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the root package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Vào thư mục của ứng dụng user
WORKDIR /usr/src/app/apps/auth

# Biên dịch TypeScript
RUN npm run build

# Chỉ copy thư mục dist
COPY ./dist/apps/auth /usr/src/app/dist

# Expose the ports the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/main.js"]
