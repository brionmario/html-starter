FROM node:10

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY bower.json ./

RUN npm install bower --global
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
