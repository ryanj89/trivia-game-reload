
exports.seed = function(knex, Promise) {
  return knex('leaderboards').del()
    .then(function () {
      return knex('leaderboards').insert([
        {
          username: 'ryanj89', 
          score: '100'
        },
        {
          username: 'lbendell', 
          score: '90'
        }
      ]);
    });
};
