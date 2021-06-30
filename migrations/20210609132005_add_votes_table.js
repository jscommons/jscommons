exports.up = knex => knex.schema.createTable('votes', t => {
  t.string('id').primary()
  t.smallint('value').notNullable()
  t.string('postId').notNullable().index()
  t.string('accountId').notNullable().index()
  t.timestamps(true, true)
})

exports.down = knex => knex.schema.dropTable('votes')
