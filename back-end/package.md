{
  "name": "back-end",
  "version": "1.0.0",
  "description": "node --experimental-specifier-resolution=node server.js",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "node ./dist/server.js",
    "start:prod": "nodemon --watch './**/*.ts' --exec 'tsc -w' --exec 'ts-node ./server.ts'",
    "nodemon": "nodemon --watch './**/*.ts' --exec 'ts-node' ./server.ts",
    "node-version": "nodemon --exec \"node -v\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongodb": "^5.7.0",
    "path": "^0.12.7",
    "swagger-ui-express": "^5.0.0",
    "typescript": "^5.1.6"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.17",
    "@types/mongodb": "^4.0.7",
    "@types/node": "^20.4.5",
    "nodemon": "^3.0.1",
    "tslib": "^2.6.1"
  }
}
