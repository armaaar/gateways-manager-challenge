# Musala Practical Task

This repo is a solution for Musala practical task using Docker, node and react.

Link to task: [https://drive.google.com/file/d/1IscwxVzB1aYM-rEjSTr-EdLdPddxG5Nm/view](https://drive.google.com/file/d/1IscwxVzB1aYM-rEjSTr-EdLdPddxG5Nm/view)

## Requirements

- Install [Docker](https://www.docker.com/)
- If you want a user friendly commands to start the app, install [Nodejs](https://nodejs.org/)

Nothing else needed. Docker will take care of all other dependecies and database setup.

## Installation

- Install and start docker on your machine. check their [Getting Started Docs](https://docs.docker.com/get-started/) for more info.
- Installation of the database, backend and frontend dependencies will be done automatically when you start the app for the first time. It might take some time depending on your internet connection and machine specs.

## Run the app

You can start the application in one of 2 modes, production or development.

- To start the application on production mode, run:

  ```sh
  npm run start
  ```

  If you don't hove nodejs installed, you can run:

  ```sh
  docker-compose --env-file ./.env.prod up
  ```

- To start the application on development mode with hot reload enabled, run:

  ```sh
  npm run dev
  ```

  If you don't hove nodejs installed, you can run:

  ```sh
  docker-compose --env-file ./.env.dev up
  ```

Once all 3 containers start successfully, you can access the frontend on port 3000 by navigating to [http://localhost:3000](http://localhost:3000) on your browser.

## Backend API

You can also access the backend API through [http://localhost:4000](http://localhost:4000).

To navigate through the backend API, or to test it, you can use `postman_collection.json` with [Postman](https://www.postman.com/)
