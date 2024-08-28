### Dockerfile for the frontend

## Base image
FROM node:19

## Creating the working directory and copying local .json files to the working directory
WORKDIR /usr/src/app
COPY package*.json ./

##  Installing dependencies
RUN npm install --silent

## Copying the rest of the local files to the working directory
COPY . .

## Exposing the port
EXPOSE 5173

## Commands
CMD ["npm", "run", "start"]