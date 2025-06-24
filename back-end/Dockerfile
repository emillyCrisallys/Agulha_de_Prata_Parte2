FROM node:22-slim

WORKDIR /app

# Copia arquivos de dependências primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
