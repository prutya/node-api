FROM node:14.2.0-alpine3.11

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile --non-interactive
RUN yarn cache clean

COPY . .
