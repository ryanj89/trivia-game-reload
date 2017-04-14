

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/trivia_game',
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: 'postgres://localhost/trivia_game_test',
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
};
