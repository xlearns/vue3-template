FROM node:16-alpine as build-stage

WORKDIR /app

COPY . ./

RUN npm config set registry http://registry.npm.taobao.org

ENV NODE_OPTIONS=--max-old-space-size=16384

# 设置阿里镜像、pnpm、依赖、编译

RUN npm install pnpm -g && \
    pnpm install --frozen-lockfile && \
    pnpm build && \
    pnpm create:nginx

RUN chmod 777 ./sentry.sh

RUN ./sentry.sh

# node部分结束

RUN echo "🎉 编 🎉 译 🎉 成 🎉 功 🎉"

FROM nginx:1.21-alpine as production-stage

COPY --from=build-stage  /app/dist ./usr/share/nginx/html

COPY --from=build-stage  /app/nginx.conf  ./etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

RUN echo "🎉 架 🎉 设 🎉 成 🎉 功 🎉"