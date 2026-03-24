FROM oven/bun:1


WORKDIR  /usr/src/ws-server

ARG DATABASE_URL
COPY  ./packages ./packages
COPY  ./bun.lock ./bun.lock

COPY  ./package.json  ./package.json
COPY  ./turbo.json     ./turbo.json

COPY ./apps/ws-server  ./apps/ws-server


COPY . .


RUN bun install
RUN bun run db:generate
RUN DATABASE_URL=${DATABASE_URL} 

EXPOSE 8082

CMD [ "bun","run","start:ws-server" ]