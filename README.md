# Eniko's House of Games API

Welcome to my Northcoders API project!\
Check out the hosted version: https://eg-house-of-games.herokuapp.com/

## Project summary

Building an API for the purpose of mimicking a real world backend service. 
It is built with 
- [Node.js](https://nodejs.org/en/) to run JS on the server side, 
- [postgreSQL](https://www.postgresql.org/) database, 
- [express](https://expressjs.com/) web framework, 
- [jest](https://jestjs.io/), [jest-sorted](https://www.npmjs.com/package/jest-sorted) and [supertest](https://www.npmjs.com/package/supertest) for TDD testing

## Instructions for use

Minimum software requirements
- Node.js v17.0.1
- postgreSQL v14.00

Clone this repo:

`git clone git@github.com:ekgazda/eg-house-of-games.git`

Run the following command to install dependencies:

`npm install`

Create these files:

`.env.development` add `PGDATABASE=nc_games` into it\
`.env.test` add `PGDATABASE=nc_games_test` into it

Run the following command to set up the databases:

`npm run setup-dbs`
