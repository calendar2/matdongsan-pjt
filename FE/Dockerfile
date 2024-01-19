FROM node:18 as builder
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
