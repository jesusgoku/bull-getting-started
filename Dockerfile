FROM node:dubnium-alpine

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js"]
