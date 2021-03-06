// NOTE: The account-role relationship could instead be set up as a one-to-many
// instead of a many-to-many so that this table (and the extra join) isn't
// necessary but this offers a little more flexibility when customizing the
// permission scheme for your application.
exports.up = knex => knex.schema.createTable('accountRoles', t => {
  t.string('id').primary()
  t.string('accountId').notNullable().index()
  t.string('roleId').notNullable()
  t.timestamps(true, true)
})

exports.down = knex => knex.schema.dropTable('accountRoles')
