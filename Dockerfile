FROM node:18-alpine AS build

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Собираем Angular приложение
RUN npm run build --prod


# ---------- STAGE 2: Nginx web server ----------
FROM nginx:alpine

# Удаляем дефолтную конфигурацию Nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранный Angular в Nginx
COPY --from=build /app/dist/Blockchain/usr/share/nginx/html/

# Копируем кастомный nginx.conf (опционально)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
