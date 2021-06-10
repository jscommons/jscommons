import { Base, Account } from '@ianwalter/nrg'
import Vote from './Vote.mjs'

export default class Post extends Base {
  static get tableName () {
    return 'posts'
  }

  static get relationMappings () {
    return {
      author: {
        relation: Base.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'posts.accountId',
          to: 'accounts.id'
        }
      },
      replies: {
        relation: Base.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'posts.id',
          to: 'posts.threadId'
        }
      },
      votes: {
        relation: Base.HasManyRelation,
        modelClass: Vote,
        join: {
          from: 'posts.id',
          to: 'votes.postId'
        }
      }
    }
  }
}
