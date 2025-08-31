FROM node:slim
LABEL maintainer="goha_backend"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && npm run start"]