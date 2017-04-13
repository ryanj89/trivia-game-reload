dropdb trivia-game --if-exists

createdb trivia-game

knex migrate:latest --knexfile app/knexfile.js

knex seed:run --knexfile app/knexfile.js