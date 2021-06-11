import * as nrg from '@ianwalter/nrg'
import { including } from '@generates/extractor'

export default class Account extends nrg.Account {
  static extractClientData (source) {
    return including(
      source,
      ...['id', 'username', 'firstName', 'lastName', 'email', 'emailVerified']
    )
  }
}
