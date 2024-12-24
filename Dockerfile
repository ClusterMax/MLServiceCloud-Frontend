# Construir el proyecto
FROM node:18 AS builder

# Configurar directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios de las dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto
RUN npm run build

# Servidor web
FROM nginx:1.23-alpine

# Copiar el build generado anteriormente al servidor
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio del servidor
CMD ["nginx", "-g", "daemon off;"]
