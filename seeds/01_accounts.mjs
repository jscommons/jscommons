import bcrypt from 'bcrypt'

export const password = 'c@ught!nTheMiddle'
const salt = bcrypt.genSaltSync(12)
const encryptedPassword = bcrypt.hashSync(password, salt)

export const accounts = {
  general: {
    id: 'general',
    username: 'general',
    firstName: 'General',
    lastName: 'test',
    email: 'general_test@example.com',
    password: encryptedPassword,
    email_verified: true
  }
}

export async function seed (knex) {
  await knex('accounts').del()
  await knex('accounts').insert(Object.values(accounts))
}
