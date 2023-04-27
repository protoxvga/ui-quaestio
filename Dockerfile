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
RUN npm run build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d

RUN mkdir -p /etc/nginx/conf.d

COPY ./default.conf /etc/nginx/conf.d/

# Change this line to match your actual Angular output directory
COPY --from=build /app/dist/client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
