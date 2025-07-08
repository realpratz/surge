FROM node:22.17-bookworm-slim

WORKDIR /usr/local/app/backend

COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/prisma ./prisma


RUN npm install
RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate dev && npm run dev"]