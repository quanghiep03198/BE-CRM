# Use the official Node.js image as the base image
FROM node:22.13.1

RUN npm i -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json pnpm-lock.yaml ./

# Install the application dependencies
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN pnpm build

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["pnpm", "start:dev"]