# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Bundle app source
COPY . .
# Start the application
CMD ["npm", "start"]


RUN node server.js


# Expose ports 3000 and 5000
EXPOSE 3000
EXPOSE 5000