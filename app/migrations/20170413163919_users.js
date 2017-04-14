exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', t => {
    t.increments();
    t.string('username').unique().notNullable();
    t.string('password').notNullable();
    t.boolean('admin').notNullable().defaultTo(false);
    t.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users');
};
