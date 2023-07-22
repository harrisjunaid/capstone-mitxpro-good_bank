FROM node:lts-alpine
ENV NODE_ENV=production
ENV ATLAS_URI=mongodb+srv://MITxPRO:Capstone1@capstone-1.q2ixm2v.mongodb.net/?retryWrites=true&w=majority
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5050
RUN chown -R node /app
USER node
CMD ["node", "--experimental-specifier-resolution=node", "server.mjs"]
