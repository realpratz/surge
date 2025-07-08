FROM node:22.17-bookworm-slim AS build-stage

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.25.3-alpine-slim AS production-stage

RUN rm -rf /usr/share/nginx/html/*

# COPY nginx.prod.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN mkdir -p /usr/log

CMD ["nginx", "-g", "daemon off;"]