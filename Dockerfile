# ---------- STAGE 1: Build Angular app ----------
FROM node:18-alpine AS build

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Собираем Angular проект
RUN npm run build --prod

# ---------- STAGE 2: Nginx ----------
FROM nginx:alpine

# Копируем сборку в nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
