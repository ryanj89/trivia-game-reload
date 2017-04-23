
exports.up = function(knex, Promise) {
    return knex.schema.createTable('leaderboards', t => {
    t.string('username').references('username').inTable('users').onDelete('CASCADE');
    t.integer('score');
    t.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('leaderboards');
};
