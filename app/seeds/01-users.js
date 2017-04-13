exports.seed = (knex) => {
  return knex('users').del().then(() => {
    return knex('users').insert([
      {
        name: 'Ryan Johnson',
        email: 'ryanj89@gmail.com',
      },
    ]);
  });
};
