FROM node:16.9.1

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./

RUN npm ci --production

RUN npm install -g @ionic/cli

COPY www/ ./

EXPOSE 80

CMD [ "ionic", "serve", "--host", "0.0.0.0"]