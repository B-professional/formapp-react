
# Stage 1: Build the React app
FROM node:16-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

# Stage 2: Serve the app with a Node.js server
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./
COPY --from=build /app/package.json ./

RUN npm install express mysql body-parser

EXPOSE 5000

CMD ["node", "server.js"]
