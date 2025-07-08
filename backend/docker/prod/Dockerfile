FROM node:22.17-bookworm

WORKDIR /app

COPY ./backend .

RUN npm install
RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "npx prisma migrate dev && npm run start"]
