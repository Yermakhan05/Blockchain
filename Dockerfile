# ---------- STAGE 1: Build ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# ---------- STAGE 2: Nginx ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Подставь имя проекта из dist/<project-name>
COPY --from=build /app/dist/Blockchain/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
