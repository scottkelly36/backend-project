## Link to Hosted version

https://scotts-game-app.herokuapp.com/

## Project Summary

this is API for the purpose of accessing application data
programmatically. This will serve data on board games,
users, comments and reviews.

The database is PSQL.

## instructions for cloning and set-up

to clone repository for from
https://github.com/scottkelly36/be-mitchs-rare-treasures

in you command line clone from the fork link provided by
github.

when cloned run npm i to install dependencies.

once installed run "npm run setup-dbs" to set up db.

Then npm t to run tests and seed DB make sure your env files
are set up first.

## env files

create a .env.test and .env.development file to run seed.

in files you can outline the enviroment variables PGDATABASE
PGUSER PGPASSWORD PGPORT

## minimum requirements

node minimum requirement is v17.9.0

to check current version of node run "node -v"
