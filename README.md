# react-nest-test

## Description

Test app with React.JS and Nest.JS.

## .env files
Create .env files in backend and frontend directories

Backend

```bash
MONGO_URI=mongodb://admin:admin@127.0.0.1:27017/rss
```

Frontend

```bash
REACT_APP_API_URL=http://localhost:5000/api/
```

## Installation
Run npm install in backend and frontend directories:

```bash
$ npm install
```
Run docker compose from backend directory:

```bash
$ docker-compose up
```


## Running the app

```bash
# frontend
$ npm run build

# backend
$ npm run start
```

Application will be available [here](http://localhost:5000/)