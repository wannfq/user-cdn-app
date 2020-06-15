FROM node:12 AS builder

WORKDIR /workspace
COPY . /workspace

RUN npm i
RUN npm run fe:build
RUN npm run build
# RUN npm run start:prod

FROM node:12 AS server

WORKDIR /workspace
COPY --from=builder /workspace/dist /workspace

RUN adduser -D myuser
USER myuser

CMD ["node", "app/main.js"]
