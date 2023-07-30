FROM node:lts-alpine
ENV NODE_ENV=production
# ENV ATLAS_URI=localhost+srv://MITxPRO:Capstone1@capstone-1.q2ixm2v.localhost.net/?retryWrites=true&w=majority
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install && mv node_modules ../
COPY ./node_modules ./node_modules
COPY . .
EXPOSE 5051
RUN chown -R node /app
USER node
CMD ["node", "--experimental-specifier-resolution=node", "server.js"]

