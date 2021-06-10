import { Base } from '@ianwalter/nrg'

export default class Vote extends Base {
  static get tableName () {
    return 'votes'
  }
}
