FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN /bin/sh -c "yarn build "

FROM nginx:1.21
COPY config/nginx.conf /etc/nginx/nginx.conf
# Копируем билд из предыдущего этапа
COPY --from=BUILD /usr/src/app/dist /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем Nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]