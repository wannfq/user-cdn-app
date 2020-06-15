FROM node:12 AS builder

WORKDIR /workspace
COPY . /workspace

RUN npm i
RUN npm run fe:build
RUN npm run build

FROM node:12 AS server

WORKDIR /workspace
COPY --from=builder /workspace /workspace

CMD ["node", "dist/app/main.js"]
