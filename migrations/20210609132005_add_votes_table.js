exports.up = knex => knex.schema.createTable('votes', t => {
  t.string('id').primary()
  t.smallint('value').notNullable()
  t.string('postId').notNullable().index()
  t.string('accountId').notNullable().index()
  t.timestamps(true, true)

  t.foreign('postId').references('id').inTable('posts').onDelete('CASCADE')
  t.foreign('accountId')
    .references('id')
    .inTable('accounts')
    .onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTable('votes')
