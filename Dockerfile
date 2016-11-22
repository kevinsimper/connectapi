FROM node:6.9.1

RUN     mkdir /cars
WORKDIR /cars
ADD     . /cars/

RUN npm install
RUN npm install -g nodemon
