import { Base } from '@ianwalter/nrg'
import Post from './Post.mjs'

export default class Vote extends Base {
  static get tableName () {
    return 'votes'
  }

  static get relationMappings () {
    return {
      post: {
        relation: Base.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'votes.postId',
          to: 'posts.id'
        }
      }
    }
  }
}
