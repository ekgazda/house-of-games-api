# Eniko's House of Games API

Welcome to my Northcoders API project!\
Check out the hosted version here: https://eg-house-of-games.herokuapp.com/api

## Project summary

Building an API for the purpose of mimicking a real world backend service, using:
- [Node.js](https://nodejs.org/en/) runtime 
- [postgreSQL](https://www.postgresql.org/) database 
- [express](https://expressjs.com/) web framework 
- [jest](https://jestjs.io/), [jest-sorted](https://www.npmjs.com/package/jest-sorted) and [supertest](https://www.npmjs.com/package/supertest) testing (w/ TDD)

## Initial setup

Minimum software requirements
- Node.js v17.0.1 - [install here](https://nodejs.dev/learn/how-to-install-nodejs)
- postgreSQL v14.00 - [install here](https://www.postgresql.org/download/)

Clone this repo:

`git clone git@github.com:ekgazda/eg-house-of-games.git`

Run the following commands:

- create .env files:

`echo PGDATABASE=nc_games > .env.development && echo PGDATABASE=nc_games_test > .env.test`

- install dependencies:

`npm install`

- set up the databases:

`npm run setup-dbs && npm run seed`

## Instructions for use

Run the server

`npm start`

Run the tests

`npm run seed-test && npm test app`


