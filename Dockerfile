# Use Node.js v14 as base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Build the Angular app
RUN npm run build

# Use NGINX as the web server
FROM nginx:latest

# Copy the built app files to the default NGINX web root directory
COPY --from=0 /app/dist/my-app /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 4200

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
