FROM node:14
RUN npm install -g npm@6.14.12
WORKDIR /app
COPY . /app
RUN npm install
CMD npm run start
EXPOSE 3000
