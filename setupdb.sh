dropdb trivia_game --if-exists
dropdb trivia_game_test --if-exists

createdb trivia_game
createdb trivia_game_test

knex migrate:latest --knexfile app/knexfile.js
knex migrate:latest --env test --knexfile app/knexfile.js

knex seed:run --knexfile app/knexfile.js
knex seed:run --env test --knexfile app/knexfile.js