FROM node:10

RUN mkdir /app
WORKDIR /app

COPY package*.json /app
COPY bower.json /app

RUN cd /app

RUN npm install bower --global
RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]
