FROM node:latest AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm build

FROM linuxserver/swag:latest AS prod

COPY --from=build /app/build/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
