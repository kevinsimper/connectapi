FROM node:6.9.1

RUN mkdir /cars
ADD . /cars
WORKDIR /cars

RUN npm install
RUN npm -g install nodemon
