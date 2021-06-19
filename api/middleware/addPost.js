import Post from '../models/Post.mjs'
import Vote from '../models/Vote.mjs'

export default async function addPost (ctx) {
  const post = await Post.query().insert({
    title: ctx.req.body.title,
    link: ctx.req.body.link,
    body: ctx.req.body.body,
    accountId: ctx.session.account.id,
    threadId: ctx.req.body.threadId,
    parentId: ctx.req.body.parentId
  })

  const updated = await post.$query()
    .withGraphJoined('[author, replies]')
    .omit(['password', 'enabled', 'emailVerified'])

  updated.votes = [
    await Vote.query().insert({
      value: 1,
      postId: updated.id,
      accountId: ctx.session.account.id
    })
  ]

  if (ctx.req.body.threadId) {
    Post.query()
      .count('id', { as: 'replyCount' })
      .findOne('threadId', ctx.req.body.threadId)
      .then(res => {
        ctx.logger.debug('Reply count', res)
        Post.query()
          .patch({ replyCount: res.replyCount })
          .findById(ctx.req.body.threadId)
          .execute()
      })
      .catch(err => ctx.logger.error('Updating replyCount failed', err))
  }

  ctx.body = updated
}
