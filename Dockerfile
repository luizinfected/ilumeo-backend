
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm install ts-node-dev

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app .

ENV NODE_ENV=production

EXPOSE 3333

CMD ["node", "dist/server.js"]
