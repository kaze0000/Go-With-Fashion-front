FROM node:16.16.0-alpine
WORKDIR /usr/src/app

ARG REACT_APP_SERVER_URL

ENV REACT_APP_SERVER_URL=${REACT_APP_SERVER_URL}

RUN npm install -g npm@8.17.0
RUN npm install -g react-scripts
RUN npm install -g typescript

