FROM node:22.17-bookworm

WORKDIR /app

COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./

RUN npm install

COPY ./backend .
RUN npm run build

CMD ["sh", "-c", "npm run start"]
