# Stage 0
FROM node:20-alpine as build-stage

WORKDIR /app

RUN npm install

COPY . .

RUN npm run build

# Stage 1
FROM nginx:1.21-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]