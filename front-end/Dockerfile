# Estágio de build
FROM node:18-alpine as build

WORKDIR /app

# Copiar arquivos de configuração de pacotes
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar o código-fonte
COPY . .

# Definir a variável de ambiente para o build
ENV VITE_API_URL=/api/

# Buildar o aplicativo
RUN npm run build

# Estágio de produção - usar node para servir os arquivos estáticos
FROM node:18-alpine

WORKDIR /app

# Instalar um servidor leve para arquivos estáticos
RUN npm install -g serve

# Copiar o build do estágio anterior
COPY --from=build /app/dist /app/dist

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["serve", "-s", "dist", "-l", "3000"]