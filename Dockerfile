# ---------- STAGE 1: Build ----------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# ---------- STAGE 2: Nginx ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# ВАЖНО: подставь имя своего проекта ниже!
COPY --from=build /app/dist/browser/Blockchain/usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
