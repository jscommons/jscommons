import Post from '../models/Post.mjs'

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
