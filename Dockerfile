FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install fb-chat-api tiktok-scraper
COPY . .
CMD ["node","bot.js"]