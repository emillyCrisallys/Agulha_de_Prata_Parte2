FROM node:22-slim AS build

COPY src /app/src
COPY package.json /app 
COPY tsconfig.json /app

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install 



CMD ["npm", "run" , "dev"]