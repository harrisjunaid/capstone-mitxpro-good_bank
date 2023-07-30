    "nodemon": "cross-env NODE_OPTIONS=\"-r ts-node/register --no-warnings\" nodemon --watch './' --exec 'ts-node-esm --require ts-node/register --files' ./server.ts",

        "nodemon": "cross-env NODE_OPTIONS=\"-r ts-node/register --no-warnings\" nodemon --watch './src' --exec 'ts-node -r ts-node/register --files ./server.ts' ./server.ts",



node --experimental-specifier-resolution=node server.js

    cors dotenv express mongodb mongoose firebase-admin 

FROM node:lts-alpine


ENV NODE_ENV=production
ENV ATLAS_URI=localhost+srv://MITxPRO:Capstone1@capstone-1.q2ixm2v.localhost.net/?retryWrites=true&w=majority
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install && mv node_modules ../
COPY ../node_modules ./node_modules
COPY . .
EXPOSE 5051
RUN chown -R node /app
USER node
CMD ["node", "--experimental-specifier-resolution=node", "server.js"]


version: '3.4'

services:
  capstone_server_1:
    image: goodbank_server
    build:
      context: .
      dockerfile: ./Dockerfile
    environment:
      NODE_ENV: production
    ports:
      - 5051:5051

"scripts": {
  "start": "tsc -p . && node server.js"
}

nodemon --exec "npm start"
