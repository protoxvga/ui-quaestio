# Use Node.js v16 as base image
FROM node:16 as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /dist/src/app/dist/client /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
