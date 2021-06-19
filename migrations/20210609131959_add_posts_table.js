exports.up = knex => knex.schema.createTable('posts', t => {
  t.string('id').primary()
  t.string('title')
  t.string('link')
  t.text('body')
  t.boolean('enabled').notNullable().defaultTo(true)
  t.boolean('deleted').notNullable().defaultTo(false)
  t.integer('replyCount').defaultsTo(0)
  t.string('accountId').notNullable()
  t.string('threadId')
  t.string('parentId')
  t.timestamps(true, true)

  t.foreign('accountId')
    .references('id')
    .inTable('accounts')
    .onDelete('CASCADE')
  t.foreign('threadId').references('id').inTable('posts').onDelete('CASCADE')
  t.foreign('parentId').references('id').inTable('posts').onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTable('posts')
