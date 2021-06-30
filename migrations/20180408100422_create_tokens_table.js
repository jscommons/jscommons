exports.up = knex => knex.schema.createTable('tokens', t => {
  t.string('id').primary()
  t.string('value').unique().notNullable()
  t.string('accountId').notNullable().index()
  t.enum('type', ['email', 'password']).notNullable().index()
  t.string('email').notNullable().index()
  t.timestamp('expiresAt').notNullable()
  t.timestamps(true, true)
})

exports.down = knex => knex.schema.dropTable('tokens')
