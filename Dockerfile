FROM node:12 AS builder

WORKDIR /workspace
COPY . /workspace

RUN npm i
RUN npm run fe:build
RUN npm run build
# RUN npm run start:prod

FROM node:12 AS server

COPY --from=builder /workspace /workspace

EXPOSE $PORT

