exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.increments()
    t.string("name").notNullable()
    t.string("email").unique()
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
