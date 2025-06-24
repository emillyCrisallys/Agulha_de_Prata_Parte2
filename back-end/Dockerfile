FROM node:22

WORKDIR /app

# Copiando os arquivos necessários antes da instalação
COPY package.json package-lock.json* tsconfig.json ./

RUN npm install

# Agora copia o resto (src etc)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
