FROM node:14.15.3

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN apt-get update && npm install

# Bundle app source
COPY . /app

# Build arguments
ARG NODE_VERSION=14.15.3

# Environment
ENV NODE_VERSION $NODE_VERSION

EXPOSE 3000
CMD ["npm", "run", "dev"]