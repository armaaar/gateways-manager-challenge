FROM node
RUN npm install -g npm@7.8.0
WORKDIR /app
COPY . /app
RUN npm install
CMD npm run start
EXPOSE 4000
