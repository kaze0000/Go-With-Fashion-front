FROM node:16.16.0-alpine
WORKDIR /usr/src/app

COPY ["app/package.json","app/package-lock.json", "./"]

RUN npm install -g npm@8.17.0
RUN npm install -g react-scripts
RUN npm install --global typescript

COPY . .
