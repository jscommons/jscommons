import * as nrg from '@ianwalter/nrg'
import { including } from '@generates/extractor'
const {
  isString,
  isEmail,
  isStrongPassword,
  trim,
  lowercase
} = require('@ianwalter/nrg-validation')

export default class Account extends nrg.Account {
  static extractClientData (source) {
    return including(
      source,
      ...['id', 'username', 'firstName', 'lastName', 'email', 'emailVerified']
    )
  }

  static get registrationSchema () {
    return {
      firstName: { isString, trim },
      lastName: { isString, trim },
      username: { isString, trim },
      email: { isEmail, trim, lowercase },
      password: { isStrongPassword }
    }
  }
}
