FROM node:22.17-bookworm

ARG USER_ID=1000
ARG GROUP_ID=1000

WORKDIR /usr/local/app/backend

COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/drizzle.config.ts ./


RUN npm install

CMD ["sh", "-c", "npm run dev"]